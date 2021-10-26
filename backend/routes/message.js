/* Imports */

const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth');
const multer = require('../config/config-multer');
const messageCtrl = require('../controllers/message');


/* Routes */

router.post('/new', auth, multer, messageCtrl.createMessage)
router.get('/all', auth, messageCtrl.getAllMessages)
router.get('/all/:id', auth, messageCtrl.getUserMessages)

/* Exports */

module.exports = router;