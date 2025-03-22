import express from 'express';
import { createServer } from 'vite';
import { handleContact } from './api/contact';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

async function startServer() {
  const app = express();
  app.use(express.json());

  // Handle API requests correctly
  app.post('/api/contact', async (req, res) => {
    await handleContact(req, res);
  });

  // Create Vite server
  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });

  // Use Vite's middleware
  app.use(vite.middlewares);

  // Start the server
  app.listen(8080, () => {
    console.log('Server running at http://localhost:8080');
  });
}

startServer();
