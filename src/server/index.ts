import path from 'path';

import dotenv from 'dotenv';
import express from 'express';
import { createServer } from 'vite';

import { handleContact } from './api/contact';
import handleResume from './api/resume';

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

async function startServer() {
  const app = express();
  app.use(express.json());

  // Handle API requests correctly
  app.post('/api/contact', async (req, res) => {
    await handleContact(req, res);
  });

  app.post('/api/resume', async (req, res) => {
    await handleResume(req, res);
  });

  // Create Vite server
  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });

  // Use Vite's middleware
  app.use(vite.middlewares);

  // Start the server
  app.listen(8081, () => {
    console.warn('Server running at http://localhost:8081');
  });
}

startServer();
