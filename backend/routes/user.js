/* Imports */

const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const auth = require('../controllers/auth');

/* Routes */

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/profil/:id', auth, userCtrl.getUserProfile)
router.put('/profil', auth, userCtrl.modifyUserProfile)

/* Exports */

module.exports = router;