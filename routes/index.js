var express = require('express');
var router = express.Router();
var controller = require('../controllers/index');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/getURL', function(req, res, next) {
  controller.ABC(req.body.url)
  // res.render('index', { title: 'Success' });
});

module.exports = router;
