
/**
 * 用户输入完之后回车或者点击添加按钮时触发
 */
var todolist = new Array();
function addToDoList(){
    //临时存放数据的结点
    var List = {
        toDoThing:'',
        isDone:false
    };
    document.getElementById('addList').value = document.getElementById('addList').value.trim();
    //判断数据是否为空
    if( document.getElementById('addList').value.length === 0){
        alert("无效输入");
        return;
    }else{//数据合格就保存到缓存
        List.toDoThing = document.getElementById('addList').value;
        List.isDone = false ; 
     
        //更新缓存，显示数据 check is there some data 
        if(getData()!=null){
            todolist = getData();
        }
       todolist.push(List);
       saveData(todolist);
       rend();
      
    }
    
      //更新数据到dom结点（从缓存中获取）

      //初始化输入框的值，光标指向输入框
}
//数据更新到页面
function rend(){
    var todo = ' ';
    var done = ' ';
    for(var i=0 ; i<getData().length ; i++){
        if(getData()[i].isDone===false){
            todo += "<li>"
            + "<input type='checkbox' "
            + "οnchange='done("+i+", \"isDone\", true)' checked>"
         
            + "</li>";  
        }else if(getData()[i].isDone===true){
            // done += "<li>"
            // + "<input type='checkbox' "
            // + "οnchange='update("+i+", \"done\", false)' checked>"
            // + "<p id='p-"+i+"' οnclick='edit("+i+")'>" + todolist[i].todo + "</p>"
            // + "<a οnclick='remove("+i+")'>-</a>"
            // + "</li>";
        }
    }
    document.getElementById('toDoList').innerHTML =   todo;
    document.getElementById('done').innerHTML =  done;
}
//done
function done(i,isDone,value){
    var todolist = getData();
    todolist[i][isDone] = value;
    saveData()
    rend();
}
//数据保存到缓存
function saveData(data) {
    localStorage.setItem("mytodolist", JSON.stringify(data));   //JS对象转换成JSON对象存进本地缓存
}
//从缓存取数据
function getData() {
    var hisTory = localStorage.getItem("mytodolist");
    if(hisTory !=null){
        return JSON.parse(hisTory);     //JSON对象转换为JS对象
    }
    else { return []; }
}



/**
 * 保存到
 */