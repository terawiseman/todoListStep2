/************************************
  todo.js
  todo以下へのルーティング
  mongoDBへのアクセスもこっちから
  date:2015.04.08
*************************************/

///ライブラリ読み込み
var express = require('express');
var moment = require('moment');

var router = express.Router();


// mongooseを用いてMongoDBに接続する
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/todoList');

/**
* mongoDBドキュメントスキーム定義
* TodoListに記載されるTaskのスキームおよび
* 各TodoListのスキームを定義する
**/
//他にmongoose.Schemaのリネーム
var Schema = mongoose.Schema;
//taskスキーマを定義する
var taskSchema = new Schema({
  isCheck     : {type: Boolean, default: false},
  text        : String,
  createdDate : {type: Date, default: Date.now},
  limitDate   : Date
});
mongoose.model('task', taskSchema);
// todoスキーマを定義する
var todoSchema = new Schema({
  name            : String,
  CreatedDate     : {type: Date, default: Date.now},
  tasks           :[taskSchema]
});
mongoose.model('Todo', todoSchema);

// /todoにGETアクセスしたとき、ToDo一覧を取得するAPI
router.get('/', function(req, res, next) {
  var Todo = mongoose.model('Todo');
  Todo.find({},function(err, todos){
    res.send(todos);
  });
});

// /todo/search/ にアクセスした時に検索窓を表示する。
router.get('/search', function(req,res){
  res.render('search',{ title: 'search'});
});

// /todo/search/query　queryに一致するtextを持つタスクを表示
router.get('/search/data', function(req,res){
  var Todo = mongoose.model('Todo');
  var list = new Array();
  Todo.find({},function(err, todos){
    for(var i=0,isize=todos.length;i<isize;i++){
      for(var j=0,jsize=todos[i].tasks.length;j<jsize;j++){
        if(todos[i].tasks[j].text.match(new RegExp(req.body.query,'i'))){
          list.push(todos[i].tasks[j]); 
        }
      }
    }
    res.send(list);
  });
});

router.get('/data/:List', function(req,res){
  var Todo = mongoose.model('Todo');
 console.log(req.params.List);
  Todo.find({name: req.params.List},function(err, todos){
    res.send(todos);
  });
});


// /todo/xxx（xxxはTodoListのname）が一致した場合 TodoListの詳細画面を表示する　
router.get('/:List', function(req,res){
  res.render('todo',{ title: req.params.List});
});


// /todoにPOSTアクセスしたとき、ToDoListを追加するAPI
router.post('/', function(req, res , next) {
  var name = req.body.name;
  // ToDoListの名前のパラーメタがあればMongoDBに保存
 if(name) {
    var Todo = mongoose.model('Todo');
    var todo = new Todo();
    todo.name = name;
    todo.save();

    res.send(true);
  } else {
    res.send(false);
  }
});

// /todo/taskにPOSTアクセスしたとき、taskを追加するAPI
router.post('/task', function(req, res , next) {
  var name = req.body.name;
  var limit = req.body.limit;
  var list = req.body.list;
  // ToDoListと必要なパラーメタがあればMongoDBに保存
  var Todo = mongoose.model('Todo');
  Todo.find({name: list},function(err,post){

    if(name && limit) {
      var Task = mongoose.model('task');
      var task = new Task();
      task.text = name;
      task.limitDate = limit;
      post[0].tasks.push(task);
      post[0].save(function(err){
       console.log(err); 
      });

      res.send(true);
     } else {
      res.send(false);
     }
  });
});

router.post('/task/:listname/:tasktext', function(req, res , next) {
  var Todo = mongoose.model('Todo');
  Todo.find({name: req.params.litname},function(err,post){
    for(var i=0,size=post.tasks.length;j<jsize;j++){
      if(post.tasks[i].text.match(req.params.tasktext)){
        console.log(post.tasks[i].isCheck);
        post.tasks[i].isCheck = !post.tasks[i].isCheck;
        console.log(post.tasks[i].isCheck);
        console.log('--------------------------');
        post.save();
      }
    }
  });


});

module.exports = router;
