/* Imports */

const express = require('express');
const app = express();
const userRoutes = require('./routes/user');
const messageRoutes = require('./routes/message');
const likeRoutes = require('./routes/like');
const commentRoutes = require('./routes/comment');
const path = require('path');

/* Middleware qui va permettre de débloquer le systeme de sécurité navigateur CORS afin que les utilisateurs est accés a l'API */

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});


app.use(express.json());
app.use(express.urlencoded({extended:true}));

/* Enregistrement des routes dans l'app */

app.use('/api/users', userRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/likes', likeRoutes);
app.use('/api/comments', commentRoutes);

/* Indique à Express qu'il faut gérer la ressource images de manière statique */

app.use('/images', express.static(path.join(__dirname, 'images')));


app.listen(process.env.PORT, () => {
    console.log(`Listening on ${process.env.PORT}`);
});

/* Exports */

module.exports = app;