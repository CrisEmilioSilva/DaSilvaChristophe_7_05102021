const express = require('express');
const app = express();

const dotenv = require('dotenv').config({path: "./config/.env"});
const Sequelize = require('./config/MySQL');

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
});

