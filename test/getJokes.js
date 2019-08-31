

// // 1567171327   已经导入
// var request = require('request');
// var myJokes = require('../controllers/tables/myJokes')
// var url = "http://v.juhe.cn/joke/content/list.php"+"?sort=&page=&pagesize=&time=1567171327&key=eeb73ff7be975348078367a54113d2d5"

// request(url, function (error, response, body) {
//   if (!error && response.statusCode == 200) {
 
//   var t = JSON.parse(body)

//   var array  = t.result.data
//   console.log(array)
//   for(var i =0 ; i< array.length ; i++){
//       myJokes.create({
//           content:array[i].content
//       })
//   }
//   }
// })