var express = require('express');
var router = express.Router();
//! cargo la libreria

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Nodepop' });
});

module.exports = router;
