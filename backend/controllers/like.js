/* Imports */

const models = require('../models');

/* Exports - Like and Unlike */

module.exports.likes = (req, res, next) => {
  models.Message.findOne({ where: {id: req.params.id} })
  .then((message) => {
    // Controle de l'utilisateur pour qu'il ne puisse liké qu'une fois a faire
      message.increment({ 'likes': 1})
      .then(() => res.status(200).json({ message: 'Message Liké !'}))
  })
  .catch(error => res.status(401).json({ error: 'Erreur Like' }));
};

module.exports.unlikes = (req, res, next) => {
  models.Message.findOne({ where: {id: req.params.id} })
  .then((message) => {
    // Controle de l'utilisateur pour qu'il ne puisse unliké qu'une fois a faire
      message.decrement({ 'likes': 1})
      .then(() => res.status(200).json({ message: 'Message Unliké !'}))
  })
  .catch(error => res.status(401).json({ error: 'Erreur Unlike' }));
};