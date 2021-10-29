/* Imports */

const models = require('../models');

/* Exports - Requête Message */

// Post Comment

module.exports.createComment = (req, res, next) => {
    models.Message.findOne({ where: {id: req.params.id} }) 
    .then((message) => {
        const UserId = message.dataValues.UserId;
        const MessageId = message.dataValues.id;
        models.Comment.create({
            content: req.body.content,
            UserId: UserId,
            MessageId: MessageId
          })
          .then(() => res.status(200).json({ message: 'Nouveau commentaire créer !'}))
          .catch((error) => {res.status(400).json({error});
        })
    })
    .catch((error) => {res.status(500).json({error: error})
    }); 
};


// Get All Comments

module.exports.getAllComments = (req, res, next) => {
    models.Comment.findAll({ 
        attributes: ['id','content'],
        include: [{
            model: models.User,
            attributes: ['firstName','lastName','imageProfileUrl']
        }]
    })
    .then((comments) => {res.status(200).json(comments);
    })
    .catch((error) => {res.status(400).json({error: 'Echec de la rêquete'});
    });
};

// Put Commentaire

module.exports.updateComment = (req, res, next) => {
  const commentObject =  req.body
  
  models.Comment.findOne({ where: {id: req.params.id} }) 
    .then((comment) => {
      comment.update({ ...commentObject }, { where: {id: req.params.id} })
      .then(() => res.status(200).json({ message: 'Commentaire modifié !'}))
  })

    .catch((error) => res.status(403).json({ error: 'Requête non autorisé' }));  
};

// Delete Commentaire

module.exports.deleteComment =  (req, res, next) => {
  
  models.Comment.findOne({ where: {id: req.params.id} })
    .then(comment => {    
        comment.destroy({ where: {id: req.params.id} })
        .then(() => res.status(200).json({ message: 'Commentaire supprimé' }))
      
  })
    .catch(error => res.status(403).json({ error: 'Requête non autorisé' }));  
};