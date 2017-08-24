var express = require('express');
var router = express.Router();
var ctrlDatabase = require('../controllers/database.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/createdb',ctrlDatabase.createDb);

router.get('/conectdb', ctrlDatabase.conectDb);

module.exports = router;
