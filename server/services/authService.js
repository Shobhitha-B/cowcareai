import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../config/database.js';

class AuthService {
  async hashPassword(password) {
    return bcrypt.hash(password, 10);
  }

  async comparePasswords(password, hash) {
    return bcrypt.compare(password, hash);
  }

  generateToken(user) {
    return jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
  }

  async registerUser(email, password, username) {
    const hashedPassword = await this.hashPassword(password);
    const query = `
      INSERT INTO users (email, password, username)
      VALUES ($1, $2, $3)
      RETURNING id, email, username
    `;
    
    const result = await pool.query(query, [email, hashedPassword, username]);
    return result.rows[0];
  }

  async loginUser(email, password) {
    const query = 'SELECT * FROM users WHERE email = $1';
    const result = await pool.query(query, [email]);
    const user = result.rows[0];

    if (!user || !(await this.comparePasswords(password, user.password))) {
      throw new Error('Invalid credentials');
    }

    const token = this.generateToken(user);
    return { user: { id: user.id, email: user.email, username: user.username }, token };
  }
}

export default new AuthService();