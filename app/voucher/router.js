var express = require('express');
var router = express.Router();
const { index, create, _create, edit, _edit, _delete, _status } = require('./controller')
const multer = require('multer')
const os = require('os')
const { isLoginAdmin } = require('../middleware/auth')

router.use(isLoginAdmin)
router.get('/', index);
router.get('/create', create);
router.post('/_create', multer({dest: os.tmpdir()}).single('thumbnail'), _create);
router.get('/edit/:id', edit);
router.put('/_edit/:id', multer({dest: os.tmpdir()}).single('thumbnail'), _edit);
router.delete('/delete/:id', _delete);
router.put('/status/:id', _status);

module.exports = router;
