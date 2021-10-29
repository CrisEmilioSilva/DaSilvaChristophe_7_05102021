/* Imports */

const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/config-multer');
const userCtrl = require('../controllers/user');

/* Routes */

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

router.get('/', auth, userCtrl.getAllUser);
router.get('/:id', auth, userCtrl.getUserProfile);
router.put('/:id', auth, multer, userCtrl.modifyUserProfile);
router.delete('/:id', auth, multer, userCtrl.deleteUserProfile);

/* Exports */

module.exports = router;