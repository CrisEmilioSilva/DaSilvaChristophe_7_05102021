/* Imports */

const express = require('express');
const app = express();
const userRoutes = require('./routes/user');
const messageRoutes = require('./routes/message');
const likeRoutes = require('./routes/like');
const commentRoutes = require('./routes/comment');
const path = require('path');


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
app.use('/api/messages/like', likeRoutes);
app.use('/api/messages/comment', commentRoutes);

app.use('/images', express.static(path.join(__dirname, 'images'))); // Indique à Express qu'il faut gérer la ressource image de manière statique


app.listen(process.env.PORT, () => {
    console.log(`Listening on ${process.env.PORT}`);
});

/* Exports */

module.exports = app;