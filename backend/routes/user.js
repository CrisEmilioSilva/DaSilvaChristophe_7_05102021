/* Imports */

const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth');
const multer = require('../config/config-multer');
const userCtrl = require('../controllers/user');

/* Routes */

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/all', auth, userCtrl.getAllUser);
router.get('/profil/:id', auth, userCtrl.getUserProfile);
router.put('/profil/:id', auth, multer, userCtrl.modifyUserProfile);
router.delete('/profil/:id', auth, userCtrl.deleteUserProfile);

/* Exports */

module.exports = router;