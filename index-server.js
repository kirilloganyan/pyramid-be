const express = require('express');
const cors = require('cors');

const userRouter = require('./routes/user.routes')

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json());
app.use(cors());
app.options('*', cors());

app.use('/api', userRouter)
app.listen(PORT, () => console.log(`Listening on ${PORT}`));