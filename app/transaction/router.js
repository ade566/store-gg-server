var express = require('express');
var router = express.Router();
const { index, action } = require('./controller')
const { isLoginAdmin } = require('../middleware/auth')

router.use(isLoginAdmin)
router.get('/', index);
router.post('/status/:id', action);

module.exports = router;
