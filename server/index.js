import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import {
  addPersonalPageInvites,
  createPersonalPage,
  fetchInitialData,
  findPersonalPageByAccess,
  findPersonalPageBySlug,
  initializeDatabase,
  upsertAccessCode,
  upsertAdminProfile,
} from './db.js';
import { createMailer } from './mailer.js';
import {
  buildPersonalPageCreatedEmail,
  buildPersonalPageInviteEmail,
} from './emailTemplates.js';

dotenv.config({ path: new URL('../.env', import.meta.url) });

const app = express();
const PORT = process.env.PORT ?? 3001;

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/initial-data', async (_req, res) => {
  try {
    const data = await fetchInitialData();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load data.' });
  }
});

app.post('/api/admin/access-code', async (req, res) => {
  const { code } = req.body ?? {};

  if (!code || typeof code !== 'string') {
    return res.status(400).json({ error: 'Access code is required.' });
  }

  try {
    await upsertAccessCode(code);
    return res.json({ status: 'ok' });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to save access code.' });
  }
});

app.post('/api/admin/profile', async (req, res) => {
  const { fullName, phone, email, address } = req.body ?? {};

  if (![fullName, phone, email, address].some((value) => typeof value === 'string')) {
    return res.status(400).json({ error: 'Profile details are required.' });
  }

  try {
    await upsertAdminProfile({ fullName, phone, email, address });
    return res.json({ status: 'ok' });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to save profile.' });
  }
});

const normalizeSlug = (value) =>
  value
    .toLowerCase()
    .trim()
    .replace(/['"]/g, '')
    .replace(/[^a-z0-9\u0590-\u05ff]+/gi, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 48);

const generateAccessCode = () => Math.floor(100000 + Math.random() * 900000).toString();

const parseEmailList = (rawList = '') =>
  rawList
    .split(/[\n,]+/)
    .map((entry) => entry.trim())
    .filter(Boolean);

const isValidEmail = (email = '') => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const getPageLink = (req, slug) => {
  const baseUrl = process.env.PUBLIC_SITE_URL || req.headers.origin || '';
  if (!baseUrl) {
    return `/#personal-page?slug=${encodeURIComponent(slug)}`;
  }
  return `${baseUrl.replace(/\/$/, '')}/#personal-page?slug=${encodeURIComponent(slug)}`;
};

app.post('/api/personal-pages', async (req, res) => {
  const { pageTitle, goal, fullName, email, phone, notes, language } = req.body ?? {};

  if (!pageTitle || !goal || !fullName || !email) {
    return res.status(400).json({ error: 'Required fields are missing.' });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ error: 'Invalid email address.' });
  }

  const numericGoal = Number(goal);
  if (!Number.isFinite(numericGoal) || numericGoal <= 0) {
    return res.status(400).json({ error: 'Goal must be a positive number.' });
  }

  let slugBase = normalizeSlug(pageTitle || fullName);
  if (!slugBase) {
    slugBase = normalizeSlug(fullName);
  }
  if (!slugBase) {
    slugBase = `page-${Date.now()}`;
  }
  let slug = slugBase;
  let suffix = 1;
  while (await findPersonalPageBySlug(slug)) {
    slug = `${slugBase}-${suffix}`;
    suffix += 1;
  }

  const accessCode = generateAccessCode();

  try {
    const page = await createPersonalPage({
      name: pageTitle,
      goal: numericGoal,
      ownerName: fullName,
      ownerEmail: email,
      ownerPhone: phone,
      notes,
      slug,
      accessCode,
    });

    const pageLink = getPageLink(req, slug);
    const mailer = await createMailer();
    const { subject, html, text } = buildPersonalPageCreatedEmail({
      language,
      pageLink,
      accessCode,
    });
    await mailer.sendMail({ to: email, subject, html, text });

    return res.json({ page, pageLink });
  } catch (error) {
    console.error('Failed to create personal page:', error);
    return res.status(500).json({ error: 'Failed to create personal page.' });
  }
});

app.post('/api/personal-pages/login', async (req, res) => {
  const { email, accessCode } = req.body ?? {};

  if (!email || !accessCode) {
    return res.status(400).json({ error: 'Email and access code are required.' });
  }

  try {
    const page = await findPersonalPageByAccess({ email, accessCode });
    if (!page) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    return res.json({ page });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to authenticate.' });
  }
});

app.post('/api/personal-pages/:slug/invite', async (req, res) => {
  const { slug } = req.params;
  const { accessCode, recipients, message, language } = req.body ?? {};

  if (!accessCode || !recipients) {
    return res.status(400).json({ error: 'Access code and recipients are required.' });
  }

  const parsedRecipients = Array.isArray(recipients)
    ? recipients
    : parseEmailList(recipients);
  const uniqueRecipients = [...new Set(parsedRecipients)].filter(isValidEmail);

  if (uniqueRecipients.length === 0) {
    return res.status(400).json({ error: 'No valid email addresses found.' });
  }

  try {
    const page = await findPersonalPageBySlug(slug);
    if (!page || page.access_code !== accessCode) {
      return res.status(403).json({ error: 'Invalid access code.' });
    }

    const pageLink = getPageLink(req, slug);
    const mailer = await createMailer();
    const { subject, html, text } = buildPersonalPageInviteEmail({
      language,
      pageLink,
      senderName: page.owner_name || page.name,
      message,
    });

    await Promise.all(
      uniqueRecipients.map((recipient) =>
        mailer.sendMail({ to: recipient, subject, html, text })
      )
    );

    await addPersonalPageInvites({
      pageId: page.id,
      recipients: uniqueRecipients,
      message,
    });

    return res.json({ status: 'ok', sent: uniqueRecipients.length });
  } catch (error) {
    console.error('Failed to send personal page invites:', error);
    return res.status(500).json({ error: 'Failed to send invites.' });
  }
});

async function startServer() {
  try {
    await initializeDatabase();
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
