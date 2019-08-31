const news = require('./tables/news');
var request = require('request');
const key="88108030d754f005712d5408e7f22f96"  //聚合可以的免费api
// 类型,,top(头条，默认),shehui(社会),guonei(国内),guoji(国际),yule(娱乐),tiyu(体育)junshi(军事),keji(科技),caijing(财经),shishang(时尚)
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
                        if(isStringValuable(data[i])===true && num <= 20){
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