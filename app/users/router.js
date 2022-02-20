var express = require('express');
var router = express.Router();
const { signin, _signin } = require('./controller')

router.get('/', signin);
router.post('/_signin', _signin);

module.exports = router;
