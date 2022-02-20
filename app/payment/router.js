var express = require('express');
var router = express.Router();
const { index, create, _create, edit, _edit, _delete, _status } = require('./controller')

router.get('/', index);
router.get('/create', create);
router.post('/_create', _create);
router.get('/edit/:id', edit);
router.put('/_edit/:id', _edit);
router.delete('/delete/:id', _delete);
router.put('/status/:id', _status);

module.exports = router;