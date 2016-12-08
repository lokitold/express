var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/results', function(req, res, next) {
  res.render('results', { title: 'RESULTADOS' });
});

router.get('/vote', function(req, res, next) {
  res.render('vote', { title: 'VOTAR' });
});

module.exports = router;
