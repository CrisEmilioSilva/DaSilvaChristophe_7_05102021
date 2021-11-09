/* Imports */

const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/config-multer');
const commentCtrl = require('../controllers/comment');


/* Routes */

router.post('/new/:id',auth, commentCtrl.createComment)
router.get('/', auth, commentCtrl.getAllComments)
router.get('/:id', auth, commentCtrl.getComment)
router.put('/:id',auth, commentCtrl.updateComment)
router.delete('/:id',auth, commentCtrl.deleteComment)

/* Exports */

module.exports = router;