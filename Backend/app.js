import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import peopleRoutes from './routes/people.js';
import loginRoutes from './routes/login.js';
import authRoutes from './routes/status.js';
import cookieParser from 'cookie-parser';

const app = express();

// Middleware
app.use(bodyParser.json());

// Разрешить CORS
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);
app.use(cookieParser()); 

// Роуты
app.use('/api/people', peopleRoutes);
app.use('/api/login', loginRoutes);
app.use('/api/auth', authRoutes);

// Запуск сервера
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
