

// http://api.tianapi.com/meinv/

var type = "social"
// // 1567171327   已经导入
var leixing = "social/"
var request = require('request');
//var myJokes = require('../controllers/tables/myJokes')
var girls = require('../controllers/tables/newsTable/girls')
var news = require('../controllers/tables/news')
// var url = "http://api.tianapi.com/meinv/"+"?key=86b171c3c296592618e424e66d9680ef&num=3"
var url = "http://api.tianapi.com/"+leixing+"/"+"?key=86b171c3c296592618e424e66d9680ef&num=50"


request(url, function (error, response, body) {
  if (!error && response.statusCode == 200) {
 
  var t = JSON.parse(body)

  
    var array = t.newslist;
    for(var i=0 ;i<array.length ;i++){
        news.create({
            title:array[i].title,
            ctime:array[i].ctime,
            url:array[i].url,
            picUrl:array[i].picUrl,
            type:type,

        }) 
    }
    console.log(array.length)
    console.log(array)
  }
})


/**
 * 
  用于移动数据 从girls表移动到news表
girls.findAll({
    attributes: ['ctime', 'url','picUrl','title'],
}).then( list =>{
    console.log("news"+list.length)
    console.log(list[0].dataValues)
 
   console.log(list[0].dataValues.url)
   console.log(list[0].dataValues.title)
   console.log(list[0].dataValues.picUrl)
   console.log(list[0].dataValues.ctime)

   console.log(list[55])
        for(var i=0 ;i<list.length ; i++){

            news.create({
                title:list[i].dataValues.title,
                ctime:list[i].dataValues.ctime,
                url:list[i].dataValues.url,
                picUrl:list[i].dataValues.picUrl,
                type:"meinv",

            }) 
  }
})

*/