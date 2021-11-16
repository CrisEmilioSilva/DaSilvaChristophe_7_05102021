/* Imports */

const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const likesCtrl = require('../controllers/like');

/* Routes */

router.post('/liked/:id', auth, likesCtrl.likes);
router.post('/disliked/:id', auth, likesCtrl.unlikes);

router.get('/', auth, likesCtrl.getLikes);

/* Exports */

module.exports = router;