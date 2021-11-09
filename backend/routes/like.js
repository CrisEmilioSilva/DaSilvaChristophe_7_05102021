/* Imports */

const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const likesCtrl = require('../controllers/like');


/* Routes */

router.post('/:id/liked', auth, likesCtrl.likes);
router.post('/:id/disliked', auth, likesCtrl.unlikes);

/* Exports */

module.exports = router;