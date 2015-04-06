var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

// ToDoスキーマを定義する
var Schema = mongoose.Schema;
var todoSchema = new Schema({
  isCheck     : {type: Boolean, default: false},
  text        : String,
  createdDate : {type: Date, default: Date.now},
  limitDate   : Date
});
mongoose.model('Todo', todoSchema);


// /todoにGETアクセスしたとき、ToDo一覧を取得するAPI
router.get('/', function(req, res, next) {
 var Todo = mongoose.model('Todo');
  // すべてのToDoを取得して送る
  Todo.find({}, function(err, todos) {
    res.send(todos);
   });
});

// /todoにPOSTアクセスしたとき、ToDoを追加するAPI
router.post('/', function(req, res , next) {
  var name = req.body.name;
  var limit = req.body.limit;
  // ToDoの名前と期限のパラーメタがあればMongoDBに保存
  if(name && limit) {
    var Todo = mongoose.model('Todo');
    var todo = new Todo();
    todo.text = name;
    todo.limitDate = limit;
    todo.save();

    res.send(true);
  } else {
    res.send(false);
  }
});

module.exports = router;
