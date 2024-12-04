import { Router } from 'express';
import bcrypt from 'bcrypt'; // Для сравнения паролей
import db from '../config/database.js';

const router = Router();

// Регулярное выражение для проверки email
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Эндпоинт для логина
router.post('/login', async (req, res) => {
  const { Email, Password } = req.body;

  console.log('Received login request:', req.body);

  // Проверка, что обязательные поля заполнены
  if (!Email || !Password) {
    console.log('Validation failed: Missing email or password');
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  // Проверка правильности формата email
  if (!emailRegex.test(Email)) {
    console.log('Validation failed: Invalid email format');
    return res.status(400).json({ error: 'Invalid email format.' });
  }

  try {
    // Проверяем наличие пользователя в базе данных
    const query = `SELECT * FROM People WHERE Email = ?`;
    db.query(query, [Email], async (error, results) => {
      if (error) {
        console.error('Database error during login:', error);
        return res.status(500).json({ error: 'Database error.' });
      }

      if (results.length === 0) {
        console.log('Login failed: User not found');
        return res.status(404).json({ error: 'User not found.' });
      }

      const user = results[0];

      // Проверяем пароль
      const passwordMatch = await bcrypt.compare(Password, user.Password);

      if (!passwordMatch) {
        console.log('Login failed: Incorrect password');
        return res.status(401).json({ error: 'Incorrect password.' });
      }

      console.log('Login successful for user:', user.Email);
      res.status(200).json({
        message: 'Login successful.',
        user: {
          id: user.Id,
          name: user.Name,
          email: user.Email,
        },
      });
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Server error during login.' });
  }
});

export default router;