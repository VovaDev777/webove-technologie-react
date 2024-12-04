import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import peopleRoutes from './routes/people.js';
import loginRoutes from './routes/login.js';

const app = express();

// Middleware
app.use(bodyParser.json());

// Разрешить CORS
app.use(cors());

// Роуты
app.use('/api/people', peopleRoutes);
app.use('/api/login', loginRoutes);

// Запуск сервера
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
