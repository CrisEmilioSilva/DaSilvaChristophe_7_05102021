const multer = require('multer');

const MIME_TYPES = {  // Dictionnaire des extensions de fichiers pour les images
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => { // Indication a multer pour l'emplacement d'enregistrement des images
    callback(null, 'images');
  },
  filename: (req, file, callback) => {  // Générer un nom de fichier unique
    const name = file.originalname.split(' ').join('_'); // Remplacement des espaces qui peuvent créer des erreurs coté serveur et les remplacer par des underscores
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});

module.exports = multer({storage: storage}).single('image');