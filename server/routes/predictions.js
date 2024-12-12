import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import predictionService from '../services/predictionService.js';
import mlService from '../services/mlService.js';

const router = express.Router();

router.post('/predict', authenticateToken, async (req, res, next) => {
  try {
    const { imageData, model } = req.body;
    const bcsScore = await mlService.predict(imageData, model);
    res.json({ bcsScore });
  } catch (error) {
    next(error);
  }
});

router.post('/', authenticateToken, async (req, res, next) => {
  try {
    const { bcsScore, imageUrl, modelUsed } = req.body;
    const prediction = await predictionService.savePrediction(
      req.user.id,
      bcsScore,
      imageUrl,
      modelUsed
    );
    res.status(201).json(prediction);
  } catch (error) {
    next(error);
  }
});

router.get('/', authenticateToken, async (req, res, next) => {
  try {
    const predictions = await predictionService.getPredictions(req.user.id);
    res.json(predictions);
  } catch (error) {
    next(error);
  }
});

export default router;