import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { fetchInitialData, initializeDatabase, upsertAccessCode, upsertAdminProfile } from './db.js';

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
