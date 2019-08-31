
var data = [{name:"mardan"} , {name:"alin"} ];
var str ='';
const querystring = require('querystring')
var todo = [{thing:"this is to do list"}];
var done = [{thing:"this is done list"} ];
module.exports=function(app){
    app.get('/todolist',function(req,res){
        console.log("get");
        res.render('todo',{todo:todo,done:done}); //这个data传到模板去了
        //res.write("hello");
        res.end();
    });

    app.post('/todo',function(req,res){
        console.log("post");
        str = '';
        req.on('data',data=>{
            str += data;
        })
        req.on('end',()=>{
            var json = querystring.parse(str);
            console.log(json);
            console.log(json.item);
            var temp = {thing:json.item};
            todo.push(temp);
            res.render('todo',{todo:todo,done:done}); //这个data传到模板去了
            res.end();
        })
        //data.push({name:json.item});
   
    });
    
    app.post('/done',function(req,res){
        console.log("post");
        str = '';
        req.on('data',data=>{
            str += data;
        })
        req.on('end',()=>{
            var json = querystring.parse(str);
            console.log(json);
            console.log(json.item);
            var temp = {thing:json.item};
            done.push(temp);
            for(let i=0; i<todo.length;i++){
                if(todo[i].thing===temp.thing){
                   todo[i].thing=todo[todo.length-1].thing;
                   todo.length = todo.length-1;
                }
            }
            res.render('todo',{todo:todo,done:done}); //这个data传到模板去了
            res.end();
        })
        //data.push({name:json.item});
   
    });
    app.post('/del',function(req,res){
        console.log("post");
        str = '';
        req.on('data',data=>{
            str += data;
        })
        req.on('end',()=>{
            var json = querystring.parse(str);
            console.log(json);
            console.log(json.item);
             var temp = {thing:json.item};
             console.log(temp);
             for(let i=0; i<todo.length;i++){
                 if(todo[i].thing===temp.thing){
                    //let t = todo[i].thing;
                    todo[i].thing=todo[todo.length-1].thing;
                    todo.length = todo.length-1;
                 }
             }
            res.render('todo',{todo:todo,done:done}); //这个data传到模板去了
            res.end();
        })
        //data.push({name:json.item});
   
    });

    app.delete('/todo',function(req,res){

    })
}
