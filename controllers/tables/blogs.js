const Sequelize = require('sequelize');
const MySQLManager = require('../utils/SQLManager');



const blogs = MySQLManager.define('blogs', {
	url: Sequelize.STRING,
      title:Sequelize.STRING,
      author:Sequelize.STRING,
      label:Sequelize.STRING,
      isDeleted:Sequelize.STRING,
});


//just a test


// messageBoard.create({
//     message:"this is the first message !",
// })
// 	.then((admin, err) => {
// 		console.log("add message success!")
// 	});





module.exports = blogs;

