var express = require('express');
var newsController = require('./controllers/newsController');
var boardController = require('./controllers/boardController');
var app = express();

app.use(express.static('./public'));

app.set('view engine','ejs');
app.set('views',__dirname+'/public/views');

app.get('/',function (req,res) {
    console.log("访问主页");
    res.header("Access-Control-Allow-Credentials", "true");
	res.header("Access-Control-Allow-Origin", "*");   
    res.sendFile(__dirname+"/public/index.html");
	res.end();

});

app.get('/todo',function (req,res) {
    console.log("访问todolist");
    res.sendFile(__dirname+"/public/todolist.html");

});
app.get('/test',function (req,res) {
    console.log("访问todolist");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Origin", " * ");
    res.json({
        code:200,
    })

});


app.get('/reyimu',function (req,res) {
    console.log("访问主页");

    res.sendFile(__dirname+"/public/Reyimu_Resume.html");

});


boardController(app);
newsController(app);

app.listen(80);

console.log('you are listening to port 80');