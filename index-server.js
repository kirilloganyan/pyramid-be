// Импорт зависимостей
const express = require('express');
const cors = require('cors');
const path = require('path');

const userRouter = require('./routes/user.routes');

const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.json());
app.use(cors({
    origin: [
        'http://localhost:3000',
        'http://91.197.98.228:8080',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.options('*', cors());

app.use((req, res, next) => {
    console.log(`CORS request from origin: ${req.headers.origin}`);
    next();
});

app.use('/api', userRouter);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
});

// Запуск сервера
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
