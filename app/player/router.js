var express = require('express');
var router = express.Router();
const { landingPage, detailPage } = require('./controller')

router.get('/landing-page', landingPage);
router.get('/detail-page/:id', detailPage);

module.exports = router;
