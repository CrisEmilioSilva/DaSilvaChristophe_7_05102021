/* Imports */

const models = require('../models');

/* Exports - Like and Unlike */

module.exports.likes = (req, res, next) => {
  models.Message.findOne({ where: {id: req.params.id} })
  .then((message) => {
    // Controle de l'utilisateur pour qu'il ne puisse liké qu'une fois a faire
      message.increment({ 'likes': 1})
      .then((message) => {
        models.Like.create({
          MessageId : message.id,
          UserId: req.body.UserId,
      })
      .then((Like) => res.status(200).json({ Like}))
      .catch(error => res.status(401).json({ error: error}));
    })
  })
};

module.exports.unlikes = (req, res, next) => {
  models.Like.findOne({where: {id: req.params.id}})
      .then(like => {
      like.destroy({where: {MessageId: req.params.id, UserId: req.body.userId}})
      .then(() => res.status(200).json({ message: 'Disliked !'}))
      .catch(error => res.status(401).json({ error: error}));
      });
};

// Get Likes

module.exports.getLikes = (req, res, next) => {
  models.Like.findAll()
  .then((likes) => {res.status(200).json(likes);
  })
  .catch((error) => {res.status(404).json({ error });
  });
};