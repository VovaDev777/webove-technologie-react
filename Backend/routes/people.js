import { Router } from 'express';
import bcrypt from 'bcrypt'; // Для хеширования паролей
import db from '../config/database.js';

const router = Router();

// Регулярные выражения для проверки данных
const nameRegex = /^[A-Za-zÀ-ž\s]+$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const yearRegex = /^\d{4}$/;
const phoneRegex = /^\+?\d{9,15}$/; // Поддержка телефонных номеров (например, +421987654321)

// Добавление записи в таблицу People
router.post('/add', async (req, res) => {
  const { Name, YearOfBirth, Country, Email, Password, Phone, Notes } = req.body;

  console.log('Received data:', req.body);

  // Валидация обязательных полей
  if (!Name || !YearOfBirth || !Country || !Email || !Password) {
    console.log('Validation failed: Missing required fields');
    return res.status(400).json({ error: 'All required fields must be filled.' });
  }

  if (!nameRegex.test(Name)) {
    console.log('Validation failed: Invalid name format');
    return res.status(400).json({ error: 'Name must contain only letters and spaces.' });
  }

  if (!yearRegex.test(YearOfBirth) || YearOfBirth < 1900 || YearOfBirth > new Date().getFullYear()) {
    console.log('Validation failed: Invalid year format');
    return res.status(400).json({ error: 'Year of birth must be a valid year between 1900 and the current year.' });
  }

  if (!emailRegex.test(Email)) {
    console.log('Validation failed: Invalid email format');
    return res.status(400).json({ error: 'Email must be a valid email address.' });
  }

  if (Phone && !phoneRegex.test(Phone)) {
    console.log('Validation failed: Invalid phone format');
    return res.status(400).json({ error: 'Phone number must be valid and contain 9 to 15 digits.' });
  }

  try {
    // Хешируем пароль перед сохранением
    const hashedPassword = await bcrypt.hash(Password, 10);

    // SQL-запрос с дополнительными полями
    const query = `
      INSERT INTO People (Name, YearOfBirth, Country, Email, Password, Phone, Notes)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    console.log('Executing query:', query, [Name, YearOfBirth, Country, Email, hashedPassword, Phone || null, Notes || null]);

    db.query(query, [Name, YearOfBirth, Country, Email, hashedPassword, Phone || null, Notes || null], (error, results) => {
      if (error) {
        console.error('Error inserting data into People:', error);
        return res.status(500).json({ error: 'Database error.' });
      }

      console.log('Insert successful:', results);
      res.status(201).json({ message: 'Person added successfully!', id: results.insertId });
    });
  } catch (error) {
    console.error('Error hashing password:', error);
    res.status(500).json({ error: 'Failed to process password.' });
  }
});

export default router;
