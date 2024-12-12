import express from 'express';
import authService from '../services/authService.js';

const router = express.Router();

router.post('/register', async (req, res, next) => {
  try {
    const { email, password, username } = req.body;
    const user = await authService.registerUser(email, password, username);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await authService.loginUser(email, password);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

export default router;