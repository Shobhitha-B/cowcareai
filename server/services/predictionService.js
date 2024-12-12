import pool from '../config/database.js';

class PredictionService {
  async savePrediction(userId, bcsScore, imageUrl, modelUsed) {
    const query = `
      INSERT INTO predictions (user_id, bcs_score, image_url, model_used)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;
    
    const result = await pool.query(query, [userId, bcsScore, imageUrl, modelUsed]);
    return result.rows[0];
  }

  async getPredictions(userId) {
    const query = `
      SELECT *
      FROM predictions
      WHERE user_id = $1
      ORDER BY created_at DESC
    `;
    
    const result = await pool.query(query, [userId]);
    return result.rows;
  }

  async getAverageScore(userId) {
    const query = `
      SELECT AVG(bcs_score) as average_score
      FROM predictions
      WHERE user_id = $1
    `;
    
    const result = await pool.query(query, [userId]);
    return result.rows[0].average_score;
  }
}

export default new PredictionService();