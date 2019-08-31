var List = {
    toDoThing:'',
    isDone:false
};
var todolist = new Array();

todolist.push(List);

window.localStorage.setItem("mytodolist", JSON.stringify(todolist)); 