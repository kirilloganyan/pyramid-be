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
    origin: 'http://localhost:3000', // Укажите URL вашего React приложения
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Разрешенные методы
    allowedHeaders: ['Content-Type', 'Authorization'], // Разрешенные заголовки
}));

// Обработка preflight-запросов
app.options('*', cors());

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

// Запуск сервера
app.listen(PORT, () => console.log(`Listening:${PORT}`));
