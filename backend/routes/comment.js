/* Imports */

const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/config-multer');
const commentCtrl = require('../controllers/comment');


/* Routes */

router.post('/new/:id',auth, multer, commentCtrl.createComment)
router.get('/:id', auth, commentCtrl.getAllComments)
router.put('/:id',auth, commentCtrl.updateComment)
router.delete('/:id',auth, multer, commentCtrl.deleteComment)

/* Exports */

module.exports = router;