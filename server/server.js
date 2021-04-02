const express = require('express');
const cors = require('cors');
const userRouter = require('./routers/user');
const db = require('./database');

const app = express();
const PORT  = process.PORT || 3030;

app.use(express.json());
app.use(cors());
app.use(userRouter);

app.get('/', (req, res) => {
    res.send('<h1>SERVER RUN</h1>');
});

app.listen(PORT, () => {
    console.log('server running on ', PORT);
})