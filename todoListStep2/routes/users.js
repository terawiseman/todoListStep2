var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resourcesssss');
});

router.get('/:id', function(req, res) {
  res.send('respond user Info userid:' + req.params.id);
});


module.exports = router;
