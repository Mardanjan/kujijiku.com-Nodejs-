
const news = require('./tables/newsTable/news');
const blogs = require('./tables/blogs');
var request = require('request');
const Sequelize = require('sequelize');

module.exports = function(app){

    /**
     * 判断无效字符串方法
     */
   function isStringValuable(data){
        if(data===null || data===undefined || data===''){
            return false
        }else{
            return true
        }
    }

    app.get('/api/newsComment/addNewsCommentById',function(req,res){
        res.header("Access-Control-Allow-Credentials", "true");
        res.header("Access-Control-Allow-Origin", " * ");
        console.log("评论")
        console.log(req.query.commentText + req.query.id)
        if(isStringValuable(req.query.id)==true && isStringValuable(req.query.commentText)==true){
            
            var ctime = new Date()
            news.newsComment.create({
                commentText:req.query.commentText,
                to:req.query.id,
                from:"匿名用户",
                ctime:ctime.toLocaleString(),
            }).then(()=>{
                console.log("成果！")
                res.json({
                    code:200,
                })
            })
        }else{
            res.json({
                code:"无效数据"
            })
        }
    })


    app.get('/api/newsComment/getCommentsById',function(req,res){
        res.header("Access-Control-Allow-Credentials", "true");
        res.header("Access-Control-Allow-Origin", " * ");
        console.log("获取评论请求")
        if(isStringValuable(req.query.id)==true){
            news.newsComment.findAll({
                where:{
                    to:req.query.id,
                },
                attributes: ['commentText','ctime','from'],
            }).then(result=>{
                if(result==null){
                    res.json({
                        code:"没有评论哦"
                    })
                }else{
                   //console.log(result)
                    res.json({
                        code:200,
                        data:result,
                    })
                }
            })
        }else{
            res.json({
                code:"无效数据"
            })
        }
    })

    app.get('/api/news/getNewsList',function(req,res){
        res.header("Access-Control-Allow-Credentials", "true");
        res.header("Access-Control-Allow-Origin", " * ");
        if(isStringValuable(req.query.page) == true){
            const page = req.query.page
            const offset = 10*(page-1)+1
            const limit = 10*(page)    
            const Op = Sequelize.Op
            news.news.findAll({
                attributes: ['id','title','ctime','author','picUrl'],
                where:{
                    id: {
                        [Op.between]: [offset, limit],    
                      }             
                }
            }).then(result => {
                //console.log(result)
                if(result==null){
                    res.json({
                        code:"数据不存在"
                    })
                }else{ 
                    news.news.findAll({   //这里需要优化，需要总共有多少数据所以查询两次
                    }).then(all=>{
                        if(all!=null){
                            res.json({
                                code:200,
                                num:all.length,
                                data:result,
                                
                            })
                        }else{
                            res.json({
                                code:201,
                            })
                        }
                    }) 
                }
            })
        }else{
            res.json({
                code:"无效页码",
            })
        }
    })
    //获取详细新闻根据TITLE
    app.get('/api/news/getNewById',function(req,res){
       res.header("Access-Control-Allow-Credentials", "true");
       res.header("Access-Control-Allow-Origin", " * ");
        console.log("api/news/getNewById")
        if(isStringValuable(req.query.id) === true){
            news.news.findOne({
                where:{
                    id:req.query.id,
                    isDelete:"no"
                }
            }).then( result=> {
                if(result == null){
                    res.json({
                        code:"不存在数据"
                    })
                }else{
                    //console.log(result)
                    res.json({
                        code:200,
                        data:result,
                    })
                }
            })
        }else{
            res.json({
                code:"无效title",
            })
        }
    })

    /**
     * 博客相关代码，后期要改
     */
    app.get('/api/news/addBlog',(req,res) => {
        res.header("Access-Control-Allow-Credentials", "true");
        res.header("Access-Control-Allow-Origin", " * ");
        console.log("/api/news/addBlog 收到")

        if(isStringValuable(req.query.title)===true && isStringValuable(req.query.url)===true ){
            console.log(req.query.title + req.query.url)
            blogs.create({
                title:req.query.title,
                url:req.query.url,
                author:req.query.author,
            }).then(()=>{
                res.json({
                    code:200,
                })
            })
        }else{
            console.log("无效数据")
            res.json({
                code:"错误的数据"
            })
        }
    })

    app.get('/api/news/getBlogList',(req,res) => {
        res.header("Access-Control-Allow-Credentials", "true");
        res.header("Access-Control-Allow-Origin", " * ");
        console.log("/api/news/getBlogList 收到")

        blogs.findAll({
            attributes: ['id','title', 'url','author','createdAt'],
            where:{
             isDeleted:null,
            }
        }).then(result=>{
            if(result===null){
                res.json({
                    code:'获取数据失败'
                })
            }else{
                res.json({
                    code:200,   
                    data:result,
                    num:result.length,
                })
            }
        })
         
    })

    app.get('/api/news/delBlog',(req,res) => {
        res.header("Access-Control-Allow-Credentials", "true");
        res.header("Access-Control-Allow-Origin", " * ");
        console.log("/api/news/delBlog 收到")
        if(isStringValuable(req.query.id)===true){
            console.log(req.query.id)
            blogs.update(
                {isDeleted: 'yes'}, 
                {
                    where: {
                        id: req.query.id
                    }
                }
            ).then(()=>{
                res.json({
                    code:200,
                })
            })
        }else{
            res.json({
                code:"无效id",
            })
        }

       
         
    })
/**
 * 根据类型获取新闻列表
 */
    app.get('/api/news/getNewsListByType',(req,res) => {
        console.log("/api/news/getNewsListByType 收到")
        
        if(isStringValuable(req.query.type) === true){
            if( isStringValuable(req.query.more) ===true){
                if(req.query.more===true){   // ger more list   = true
                    res.header("Access-Control-Allow-Credentials", "true");
                    res.header("Access-Control-Allow-Origin", " * ");
                    news.findAll({
                        attributes: ['id','ctime', 'url','picUrl','title'],
                        where:{
                            type:req.query.type,
                            delete_at:null,
                        }
                    }).then( data =>{
                        res.json({  
                            code:200,
                            num:data.length,
                            data:data,
                        })
                    })
                }
            }else{
                res.header("Access-Control-Allow-Credentials", "true");
                res.header("Access-Control-Allow-Origin", " * ");
                console.log(req.query.type)
                var type=req.query.type
                news.findAll({
                    attributes: ['id','ctime', 'url','picUrl','title'],
                    where:{
                        type:type,
                        delete_at:null,
                    },
                }).then( data =>{
                    var array = []
                    var num = 0;
                    for(var i=0 ;i< data.length ; i++){
                        if(isStringValuable(data[i])===true && num < 10){
                            array[i] = data[i]
                            num++
                         //   console.log(num)
                        }
                    }
                   
                    res.json({
                        code:200,
                        num:num,
                        data:array,
                    })
                })
            }
        }else{
            res.json({
                code:"无效type"
            })
        }
    })
   /**
    * 已废：限制使用次数
    * 中间接口：从聚合科技api中获取数据 再返回给前端
    * 
    */
        // app.get('/api/news/getNewsListByCategory',(req,res) => {
        //     res.header("Access-Control-Allow-Credentials", "true");
        //     res.header("Access-Control-Allow-Origin", " * ");
        //     console.log("接收请求了")
        //     if(req.query.category===undefined || req.query.category===null){
        //         res.json({
        //             code:"新闻类型格式不正确",
        //         })
        //     }else{
        //         var type = req.query.category 
        //         if(type === 'yule' || type=== 'shishang' || type=== 'keji' || type==='top'){
        //             var url = "http://v.juhe.cn/toutiao/index?type="+type+"&key="+key 
        //             request('http://v.juhe.cn/toutiao/index?type=shishang&key=88108030d754f005712d5408e7f22f96', function (error, response, body) {
        //                 if (!error && response.statusCode == 200) {
        //                     res.json({
        //                         code:200,
        //                         message:JSON.parse(body)
        //                     })
                            
                            
        //                 }else{
        //                     res.json({
        //                         code:"不知道是什么错误"
        //                     })
        //                 }
        //             })

        //         }else{
        //             res.json({
        //                 code:"新闻类型不正确",
        //             })
        //         }
        //     }
        // })

    // 自己数据库中的新闻
        app.get('/api/news/getNewsList',function(req,res){
            res.header("Access-Control-Allow-Credentials", "true");
            res.header("Access-Control-Allow-Origin", " * ");
            console.log("请求收到")
            news.findAll({
                attributes: ['id','ctime', 'url','picUrl','title'],
            }).then(result =>{
                if(result===null){
                    res.json({
                        code:'数据库没有数据',
                    })
                }else{
                    res.json({
                        code:200,
                        message:result,
                    })
                }
            })
          
        })

}