$(function(){
  getQuery();
});

var query;

//ＨＴＭＬタグを除去する関数
function deldiv(str){
  return $('<div>').html(str).text(); 
}

$('#query').submit(function(){
    postQuery();
    return false;
});

// ToDo一覧を取得して表示する
function getQuery(){
  if(null == query)return false;
  // すでに表示されている一覧を非表示にして削除する
  var $list = $('.list');
  $list.fadeOut(function(){
    $list.children().remove();
    // /todoにGETアクセスする
    $.get('/todo/search/',{querly: querly}, function(todos){
      // 取得したToDoを追加していく
      $.each(todos.task, function(index, task){
        var limit = new Date(todo.limitDate);
        $list.append('<p><input type="checkbox" ' + (task.isCheck ? 'checked' : '') + '>' + task.text + '</p>');
      });
      // 一覧を表示する
      $list.fadeIn();
    });
  });
}


// フォームに入力されたToDoを追加する
function postQuery(){
  // フォームに入力された値を取得
  query = deldiv($('#query').val());

   //再度表示する
    getquery();
}
