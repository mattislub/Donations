import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { fetchInitialData, initializeDatabase } from './db.js';
import { buildDonationEmail } from './emailTemplates.js';
import { createMailer } from './mailer.js';

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

let mailerPromise;

const getMailer = () => {
  if (!mailerPromise) {
    mailerPromise = createMailer();
  }
  return mailerPromise;
};

app.post('/api/donation-email', async (req, res) => {
  const {
    fullName,
    email,
    donationLevel,
    itemSelection,
    dedication,
    currency,
    message,
    language,
  } = req.body ?? {};

  if (!fullName || !email) {
    return res.status(400).json({ error: 'Full name and email are required.' });
  }

  try {
    const mailer = await getMailer();
    const data = {
      fullName,
      email,
      donationLevel,
      itemSelection,
      dedication,
      currency,
      message,
    };

    const adminEmail = process.env.SMTP_TO ?? process.env.SMTP_FROM;
    const adminTemplate = buildDonationEmail({
      data,
      language,
      isAdmin: true,
    });
    const donorTemplate = buildDonationEmail({
      data,
      language,
      isAdmin: false,
    });

    await Promise.all([
      mailer.sendMail({
        to: adminEmail,
        subject: adminTemplate.subject,
        html: adminTemplate.html,
        text: adminTemplate.text,
        replyTo: email,
      }),
      mailer.sendMail({
        to: email,
        subject: donorTemplate.subject,
        html: donorTemplate.html,
        text: donorTemplate.text,
      }),
    ]);

    res.json({ status: 'sent' });
  } catch (error) {
    console.error('Failed to send donation email:', error);
    res.status(500).json({ error: 'Failed to send email.' });
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
