import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { fetchInitialData, initializeDatabase } from './db.js';

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
