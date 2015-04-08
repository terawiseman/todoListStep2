/************************************
  index.js
  サイトルートに来た時のルーティング
  ＴＯＰページへのアクセス
  date:2015.04.08
*************************************/

var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'TodoList' });
});

module.exports = router;
