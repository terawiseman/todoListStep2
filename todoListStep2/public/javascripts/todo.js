$(function(){
  getList();
});

//ＨＴＭＬタグを除去する関数
function deldiv(str){
  return $('<div>').html(str).text(); 
}

$('#task').submit(function(){
    postTask();
    return false;
});

var title = $("title").text();

function taskHtml(task){
  var str = null;
  for(var i=0,size=task.lenght;i<size;i++){
   var limit = new Date(task[i].limitDate);
   var create= new Date(task[i].createdDate);
   str = str + '<div class="task">'
 　　　　  +'<div class="taskLeft">'
           +'<p>'+task[i].text+'</p>'
           +'<p>期限：'
           +limit.getFullYear()+'年'
           +limit.getMonth()+'月'
           +limit.getDate()+'日</p>'
           +'<p>作成：'
           +create.getFullYear()+'年'
           +create.getMonth()+'月'
           +create.getDate()+'日</p>'
           +'</div><div class="taskright>"';
                  
          if(task[i].isCheck){
            str = str + '<button type=button onclick="toggleTask('
                      +title+','+task[i].text
                      +')">完了</button></div></div>';
          }else{
            str = str + '<button type=button onclick="toggleTask('
                      +title+','+task[i].text
                      +')">未完了</button></div></div>';
          }
  }
    return str;  
}

// ToDo一覧を取得して表示する
function getList(){
  // すでに表示されている一覧を非表示にして削除する
  var $list = $('.list');
  $list.fadeOut(function(){
    $list.children().remove();
    // /todo/data/todolist.name にGETアクセスする
    $.get('/todo/data/'+title, function(todos){
      // 取得したToDoを追加していく
      var str = taskHtml(todos);
     $list.append(str);
      // 一覧を表示する
      $list.fadeIn();
    });
  });
}

function toggleTask(listname,tasktext){
    $.post('/todo/'+listname+'/'+tasktext, {}, function(res){});
}


// フォームに入力されたToDoを追加する
function postTask(){
  // フォームに入力された値を取得
  var name = deldiv($('#text').val());
  var limitDate = new Date($('#limit').val());

  //入力項目を空にする
  $('#text').val('');
  $('#limit').val('');
  
  // /todoにPOSTアクセスする
  $.post('/todo/task', {list: title, name: name, limit: limitDate}, function(res){
    console.log(res);
    //再度表示する
    getList();
  });
}
