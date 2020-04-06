






// 1567171327   已经导入
var request = require('request');
var news = require('./news.js')

// var url ="http://api.jisuapi.com/news/get?channel='科技'&start=0&num=40&appkey=0e43090d68d673dd"
var url = "http://api.jisuapi.com/news/get?channel=%E5%A4%B4%E6%9D%A1&start=0&num=40&appkey=0e43090d68d673dd"

request(url, function (error, response, body) {
  if (!error && response.statusCode == 200) {
 
   var t = JSON.parse(body)
   console.log(t)
  var array  = t.result.list
  console.log(t.result.list[0])
//   console.log(response.body)
console.log(array.length)
  for(var i =0 ; i< array.length ; i++){
      news.news.create({
          title:array[i].title,
          ctime:array[i].time,
          author:array[i].src,
          picUrl:array[i].pic,
          url:array[i].url,
          content:array[i].content,
          newsType:"头条",
      })
  }
  }
})
// var request = require('request');




// var newsUrl = "https://api.jisuapi.com/news/get?channel=%E5%A4%B4%E6%9D%A1&start=0&num=1&appkey=0e43090d68d673dd"
// // var newsUrl ="https://www.jisuapi.com/debug/news/?act=relay&url=https%3A%2F%2Fapi.jisuapi.com%2Fnews%2Fget&channel=%E5%A4%B4%E6%9D%A1&num=10&start=0&_=1567701238563"


// const https = require('https');

// https.get(newsUrl, (res) => {
//   console.log('statusCode:', res.statusCode);
//   console.log('headers:', res.headers);
//   console.log(res)  

// });

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