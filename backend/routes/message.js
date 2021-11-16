/* Imports */

const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/config-multer');
const messageCtrl = require('../controllers/message');

/* Routes */

router.post('/new/:id',auth, multer, messageCtrl.createMessage)
router.get('/', auth, messageCtrl.getAllMessages)
router.get('/:id', auth, messageCtrl.getUserMessage)
router.put('/:id', auth, multer, messageCtrl.updateMessage)
router.delete('/:id', auth, multer, messageCtrl.deleteMessage)

/* Exports */

module.exports = router;