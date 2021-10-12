/* Imports */

const models = require('../models');

/* Exports */

module.exports.createMessage = (req, res, next) => {
    
    const title = req.body.title;
    const content = req.body.content;

    if (title == null || content == null  ) {
        return res.status(400).json({ 'error': 'Votre message doit contenir un titre et un contenu' });
    }
    
    models.User.findOne({id: req.params.id})
      .then((user) => {
        
        const message = models.Message.create({
         title: title,
         content: content,
         likes: 0,
         UserId: user.id
        })

        .then(() => res.status(200).json({message: 'Nouveau message créer'}))
        .catch(error => res.status(400).json({ error }));
    })

    .catch((error) => {res.status(500).json({error: error});
    })
};

module.exports.getAllMessages = (req, res, next) => {
    
    const fields  = req.params.fields; // Récupération dans les paramètres de l'url : fields permet de séléctionner les valeurs que l'on souhaite afficher
    const limit   = parseInt(req.params.limit); // limit : Récupération des messages par ségmentation
    const offset  = parseInt(req.params.offset); // offset : Récupération des messages par ségmentation
    const order   = req.params.order; // order : Récupération des messages par ordre particulier

    models.Message.findAll({
      order: [(order != null) ? order.split(':') : ['title', 'ASC']],
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