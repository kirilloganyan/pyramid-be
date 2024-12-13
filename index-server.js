// Импорт зависимостей
const express = require('express');
const cors = require('cors');
const path = require('path');

const userRouter = require('./routes/user.routes');

const PORT = process.env.PORT || 8080;
const app = express();

// Middleware
app.use(express.json()); // Парсинг JSON
app.use(cors({
    origin: [
        'http://localhost:3000', // Для разработки
        'http://91.197.98.228:8080', // Укажите ваш домен или IP
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Обработка preflight-запросов
app.options('*', cors());

// Логирование запросов (для отладки CORS)
app.use((req, res, next) => {
    console.log(`CORS request from origin: ${req.headers.origin}`);
    next();
});

// Роуты API
app.use('/api', userRouter);

// Раздача статических файлов React (для production)
if (process.env.NODE_ENV === 'production') {
    const reactBuildPath = path.join(__dirname, 'client', 'build');
    app.use(express.static(reactBuildPath));

    app.get('*', (req, res) => {
        res.sendFile(path.join(reactBuildPath, 'index.html'));
    });
}

// Обработка ошибок
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
});

// Запуск сервера
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
