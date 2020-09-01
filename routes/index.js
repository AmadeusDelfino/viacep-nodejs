var express = require('express');
var router = express.Router();
const controller = require('./../controllers/CepController')

router.get('/cep', controller.get)
router.get('/multcep', controller.multcep)
module.exports = router;
