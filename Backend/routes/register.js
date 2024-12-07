const express = require('express');
const db = require('../config/database'); // Подключение к базе данных
const router = express.Router();

// Регистрация пользователя
router.post('/register', (req, res) => {
  const { name, yearOfBirth, country, email, phone, note, password } = req.body;

  if (!name || !yearOfBirth || !country || !email || !password) {
    return res.status(400).json({ error: 'All required fields must be filled.' });
  }

  const query = 'INSERT INTO Poiasnik.People (name, yearOfBirth, country, email, phone, note, password) VALUES (?, ?, ?, ?, ?, ?, ?)';

  db.query(query, [name, yearOfBirth, country, email, phone, note, password], (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      return res.status(500).json({ error: 'Database error.' });
    }
    res.status(201).json({ message: 'User registered successfully!' });
  });
});

module.exports = router;
