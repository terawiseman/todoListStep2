//ページを読み込んだときに呼び出される
$(function(){
  getList();
});

// フォームを送信ボタンを押すと、ToDoを追加して再表示する。
$('#form').submit(function(){
  postList();
  return false;
});


//ＨＴＭＬタグを除去する関数
function deldiv(str){
  return $('<div>').html(str).text(); 
}

//TodoListの概要を表示するHTMLデータを整形する関数
function todoListHtml(todoList){
  var n=todoList.tasks.length;
    var str ='<div class="todoList"><a href= "/todo/'
          +todoList.name
          +'">'
          +todoList.name
          +'</a><p>';
  if(0 == n){
      str = str
          + 'Todoはありません</p>';
  }else{
    var m=0;
    var nearDate = new Date(todoList.tasks[0].limitDate);
    for(var i=0;i<n;i++){
     if(todoList.tasks[i].isCheck)m++;
       var temp = new Date(todoList.tasks[i].limitDate);
       if(nearDate.getTime() > temp.getTime()){
         nearDate = temp;
       }
    }
    str = str
        +n
        +'個中'
        +m
        +'個終了<p><p>～'
        +nearDate.getFullYear()+'年'
        +nearDate.getMonth()+'月'
        +nearDate.getDate()+'日';
    }
  return str;
}


// ToDo一覧を取得して表示する
function getList(){
  // すでに表示されている一覧を非表示にして削除する
  var $list = $('.list');
  $list.fadeOut(function(){
    $list.children().remove();
    // /todoにGETアクセスする
    $.get('/todo', function(todos){
      // 取得したToDoを追加していく
      $.each(todos, function(index, todo){
        $list.append(todoListHtml(todo));
      });
      // 一覧を表示する
      $list.fadeIn();
    });
  });
}

// フォームに入力されたToDoを追加する
function postList(){
  // フォームに入力された値を取得
  var name = deldiv($('#name').val());
  //var name = $('#name').val();
  //入力項目を空にする
  $('#name').val('');
 
  // /todoにPOSTアクセスする
  $.post('/todo', {name: name}, function(res){
    getList();
  });
}

