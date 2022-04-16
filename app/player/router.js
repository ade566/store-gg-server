var express = require('express');
var router = express.Router();
const { landingPage, detailPage, category, checkout, history, historyDetail, dashboard } = require('./controller')
const { isLoginPlayer } = require('../middleware/auth')

router.get('/landing-page', landingPage);
router.get('/detail-page/:id', detailPage);
router.get('/category', category);
router.post('/checkout', isLoginPlayer, checkout);
router.get('/history', isLoginPlayer, history);
router.get('/history/:id/detail', isLoginPlayer, historyDetail);
router.get('/dashboard', isLoginPlayer, dashboard);

module.exports = router;
