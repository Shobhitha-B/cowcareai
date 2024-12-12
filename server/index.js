import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

import { errorHandler } from './middleware/errorHandler.js';
import authRoutes from './routes/auth.js';
import predictionRoutes from './routes/predictions.js';
import mlService from './services/mlService.js';

dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.static('public'));

// Load ML models
mlService.loadModels().catch(console.error);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/predictions', predictionRoutes);

// Error handling
app.use(errorHandler);

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});