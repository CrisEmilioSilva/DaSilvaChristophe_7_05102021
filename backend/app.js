/* Imports */

const express = require('express');
const app = express();
const userRoutes = require('./routes/user');

app.get('/', function (req, res, next) {
    res.send('hello world'); // Test appel route get
});

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api/auth', userRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Listening on ${process.env.PORT}`);
});

/* Exports */

module.exports = app;