var express = require('express');
var router = express.Router();
const { index, create, _create } = require('./controller')

router.get('/', index);
router.get('/create', create);
router.post('/_create', _create);

module.exports = router;
