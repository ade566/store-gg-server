var express = require('express');
var router = express.Router();
const { signin, _signin, signout } = require('./controller')

router.get('/', signin);
router.post('/_signin', _signin);
router.get('/signout', signout);

module.exports = router;
