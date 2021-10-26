/* Imports */

const models = require('../models');

/* Exports */

module.exports.getUserMessages = (req, res, next) => {
  models.Message.findOne({ where: {id: req.params.id} })
  .then((message) => {res.status(200).json(message);
  })
  .catch((error) => {res.status(404).json({error: error});
  });
};

module.exports.createMessage = (req, res, next) => {
  
 
  models.User.findOne({id: req.params.id} ) 
  .then((user) => {
    models.Message.create({
        content: req.body.content,
        gif: req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null,
        likes: 0,
        UserId: user.id
      })
      .then(() => res.status(200).json({ message: 'Profil utilisateur modifié !'}))
      .catch((error) => {res.status(500).json({error: error});
    })
   
  });
};

module.exports.getAllMessages = (req, res, next) => {
    
    const fields  = req.params.fields; // Récupération dans les paramètres de l'url : fields permet de séléctionner les valeurs que l'on souhaite afficher
    const limit   = parseInt(req.params.limit); // limit : Récupération des messages par ségmentation
    const offset  = parseInt(req.params.offset); // offset : Récupération des messages par ségmentation
    const order   = req.params.order; // order : Récupération des messages par ordre particulier

    models.Message.findAll({
      order: [(order != null) ? order.split(':') : ['content', 'ASC']],
      attributes: (fields !== '*' && fields != null) ? fields.split(',') : null,
      limit: (!isNaN(limit)) ? limit : null,
      offset: (!isNaN(offset)) ? offset : null,
      include: [{
        model: models.User,
        attributes: ['firstName','lastName']
      }]
    })
    .then(function(messages) {
      if (messages) {
        res.status(200).json(messages);
      } else {
        res.status(404).json({ 'error': 'Message non trouvé' });
      }
    })
    .catch((error) => {res.status(500).json({error: error});
    })
};