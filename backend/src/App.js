require('dotenv').config();
const express = require('express');
const PORT = process.env.PORT;

const app = express();
app.use(express.json());

const db = require('./config/db');

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;