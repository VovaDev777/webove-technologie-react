import { Router } from 'express';
import bcrypt from 'bcrypt';
import db from '../config/database.js';

const router = Router();


const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// for login
router.post('/login', async (req, res) => {
  const { Email, Password } = req.body;

  console.log('[LOGIN] Received login request:', req.body);

  if (!Email || !Password) {
    console.log('[LOGIN] Validation failed: Missing email or password');
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  if (!emailRegex.test(Email)) {
    console.log('[LOGIN] Validation failed: Invalid email format');
    return res.status(400).json({ error: 'Invalid email format.' });
  }

  try {
    const query = `SELECT * FROM People WHERE Email = ?`;
    db.query(query, [Email], async (error, results) => {
      if (error) {
        console.error('[LOGIN] Database error:', error);
        return res.status(500).json({ error: 'Database error.' });
      }

      if (results.length === 0) {
        console.log('[LOGIN] User not found');
        return res.status(404).json({ error: 'User not found.' });
      }

      const user = results[0];
      const passwordMatch = await bcrypt.compare(Password, user.Password);

      if (!passwordMatch) {
        console.log('[LOGIN] Incorrect password');
        return res.status(401).json({ error: 'Incorrect password.' });
      }

      console.log('[LOGIN] Login successful.');
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
    console.error('[LOGIN] Server error:', error);
    res.status(500).json({ error: 'Server error during login.' });
  }
});

export default router;



