var express = require('express');
var router = express.Router();
const { index, create, _create } = require('./controller')
const multer = require('multer')
const os = require('os')

router.get('/', index);
router.get('/create', create);
router.post('/_create', multer({dest: os.tmpdir()}).single('thumbnail'), _create);
// router.get('/edit/:id', edit);
// router.put('/_edit/:id', _edit);
// router.delete('/delete/:id', _delete);

module.exports = router;
