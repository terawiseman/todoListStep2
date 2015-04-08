$(function(){
  console.log("todoInput.js");
  getList();
});

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ajax_test');

// ToDoスキーマを定義する
var Schema = mongoose.Schema;
var todoSchema = new Schema({
  isCheck     : {type: Boolean, default: false},
  text        : String,
  createdDate : {type: Date, default: Date.now},
  limitDate   : Date
});
mongoose.model('Todo', todoSchema);

// ページが表示されたときToDoリストを表示する


// フォームを送信ボタンを押すと、ToDoを追加して再表示する。
$('#form').submit(function(){
  postList();
  return false;
});

// ToDo一覧を取得して表示する
function getList(){
  // すでに表示されている一覧を非表示にして削除する
  console.log("test:teststring");
  var $list = $('.lists');
  $list.fadeOut(function(){
    $list.children().remove();
    var Todo = mongoose.model('Todo');
    // すべてのToDoを取得して送る
    Todo.find({}, function(err, todos) {
//      $list.append('<p>'+docs[i].doc+'</p>');
      for(var i=0,size=todos.length;i<size;i++){
        var limit = new Date(todos[i].doc.limitDate);
        $list.append('<p><input type="checkbox" ' + (todos[i].doc.isCheck ? 'checked' : '') + '>' + todos[i].doc.text + ' (~' + limit.toLocaleString() + ')</p>');
      }
   });
    // 一覧を表示する 
    $list.fadeIn();
    
  });


}

// フォームに入力されたToDoを追加する
function postList(){
  // フォームに入力された値を取得
  var name = $('#text').val();
  var limitDate = new Date($('#limit').val());

  //入力項目を空にする
  $('#text').val('');
  $('#limit').val('');

  // /todoにPOSTアクセスする
  $.post('/todo', {name: name, limit: limitDate}, function(res){
    console.log(res);
    //再度表示する
    getList();
  });
}