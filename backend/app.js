/* Imports */

const express = require('express');
const app = express();
const userRoutes = require('./routes/user');
const messageRoutes = require('./routes/message');


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });


app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.use('/api/users', userRoutes);
app.use('/api/messages', messageRoutes);


app.listen(process.env.PORT, () => {
    console.log(`Listening on ${process.env.PORT}`);
});

/* Exports */

module.exports = app;