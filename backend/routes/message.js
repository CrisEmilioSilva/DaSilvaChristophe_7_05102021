/* Imports */

const express = require('express');
const router = express.Router();
const messageCtrl = require('../controllers/message');
const auth = require('../controllers/auth');

/* Routes */

router.post('/new', auth, messageCtrl.createMessage)
router.get('/all', auth, messageCtrl.getAllMessages)

/* Exports */

module.exports = router;