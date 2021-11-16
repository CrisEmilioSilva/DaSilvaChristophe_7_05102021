/* Imports */

const models = require('../models');

/* Exports - Requête Message */

// Post Comment

module.exports.createComment = (req, res, next) => {
  models.Message.findOne({ where: {id: req.params.id} }) 
  .then((message) => {
    console.log(message);
      models.Comment.create({
          commentaire: req.body.commentaire,
          MessageId: message.dataValues.id,
          UserId: req.body.UserId
        })
        .then(() => res.status(200).json({ message: 'Nouveau commentaire créer !'}))
        .catch((error) => {res.status(400).json({'error': 'Création du commentaire échoué'});
      })
    })
    .catch((error) => {res.status(500).json({ error })
    });
  };

// Get All Comments

module.exports.getAllComments = (req, res, next) => {

  const fields  = req.params.fields; // Récupération dans les paramètres de l'url : fields permet de séléctionner les valeurs que l'on souhaite afficher
  const order   = req.params.order; // order : Récupération des messages par ordre particulier
    
  models.Comment.findAll({ 
    order: [(order != null) ? order.split(':') : ['createdAt', 'ASC']],
    attributes: (fields !== '*' && fields != null) ? fields.split(',') : null,
      include: [{
          model: models.User,
          attributes: ['firstName','lastName','imageProfileUrl'],
      }]   
    })
  .then(function(comments) {
    if (comments) {
      res.status(200).json(comments);
    } else {
      res.status(404).json({ 'error': 'Commentaires non trouvé' });
    }
  })
  .catch((error) => {res.status(400).json({error: 'Echec de la rêquete'});
  });
};

// Get Comment

module.exports.getComment = (req, res, next) => {
  models.Comment.findOne({ where: {id: req.params.id} })
  .then((comment) => {res.status(200).json(comment);
  })
  .catch((error) => {res.status(404).json({ error });
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