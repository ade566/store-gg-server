var express = require('express');
var router = express.Router();
const { landingPage, detailPage, category, checkout } = require('./controller')
const { isLoginPlayer } = require('../middleware/auth')

router.get('/landing-page', landingPage);
router.get('/detail-page/:id', detailPage);
router.get('/category', category);
router.post('/checkout', isLoginPlayer, checkout);

module.exports = router;
