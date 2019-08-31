
const messageBoard = require('./tables/messageBoard');
const querystring = require('querystring');
var url = require('url');

module.exports = function(app){
    app.get('/test2',function (req,res) {
        console.log("访问todolist1111");
        res.header("Access-Control-Allow-Credentials", "true");
        res.header("Access-Control-Allow-Origin", " * ");
        res.json({
            code:200,
        })
    
    });


    /**
     * get 根据id获取留言内容以及发表时间
     */
    app.get('/api/messageBoard/getMessageById',function(req,res){
        res.header("Access-Control-Allow-Credentials", "true");
        console.log(req.query.id)
        if(req.query.id==undefined || req.query.id==null || req.query.id=='' ){
            res.json({
                code:"id is not find ",
            })
        }else{
            if(req.query.id % 1 != 0 ){
                res.json({
                    code:" id  is not find !",
                })
            }else{
                messageBoard.findOne({
                    attributes: ['message', 'createdAt'],
                    where:{
                        id:req.query.id,
                        delete_at:null,
                    }
                  }).then(result=>{
                      if(result==null){
                          res.json({
                              code:'没有此id对应的数据',
                          });
                      }else{
                          res.json({
                              code:200,
                              message:result,
                          })
                      }
                  })
            }
        }
      
    })
    /**
     * get 获取addMessage页面
     */
    app.get('/addMessagePage',function(req,res){
        res.render('addMessage'); //这个data传到模板去了
                res.end();
    })
    /**
     * del 删除留言
     */
    app.post('/api/messageBoard/delMessage',function(req,res){
        console.log("del message!");
        var str ='';
        req.on('data',data=>{
            str += data;
        });
        req.on('end',()=>{
            var json = querystring.parse(str);
            console.log("delete message id "+ json.messageId);
            const myDate = new Date();
            const updataValues = {
            delete_at: myDate.toString(),
            }
        messageBoard.update(
            updataValues,
            {
                where: {
                    id:json.messageId,
                },
            }
        ).then(()=>{
            res.json({
                code:200,
            });
        });
        });
    });

    /**
     * get 获取留言板页面 , 针对自己，可以用来删除留言
     */

    app.get('/myboard',function(req,res){
        console.log("getBoard");
        messageBoard.findAll({
            where: {
                delete_at: null,
            },
        }).then((messages)=>{
            if(messages!=null){
                res.render('privateBoard',{messages:messages}); //这个data传到模板去了
                res.end();
            }else{
                res.end("sql error!");
            }
        }); 
    });

    /**
     * get 获取留言板页面 ， 针对访问者，只显示留言内容和留言时间
     */
    app.get('/messageBoard',function(req,res){
        console.log("getBoardForVisitor");
        messageBoard.findAll({
            attributes: ['message', 'createdAt'],
            where:{
                delete_at:null,
            },
        }).then((messages)=>{
            if(messages!=null){
                res.render('messageBoard',{messages:messages});
                res.end();
            }else{
                res.json({
                    code:"sql error ！",
                });
            }
        });
    });

    /**
     * post 添加留言接口
     */
    app.post('/api/messageBoard/addMessage',function(req,res){
        res.header("Access-Control-Allow-Credentials", "true");
        res.header("Access-Control-Allow-Origin", "*");   
        console.log("post");
        var str = '';
        req.on('data',data=>{
            str += data;
        })
        req.on('end',()=>{
            var json = querystring.parse(str);
            console.log(json);
            console.log(json.message);
            messageBoard.create({
                message:json.message,
            }).then(()=>{
                    messageBoard.findAll().then((messages)=>{
                        if(messages!=null){
                         res.json({
                             code:200,
                         });
                        }else{
                            res.json({
                                code:"sql error!",
                            });
                        }
                    });
            });
        });
    });
}