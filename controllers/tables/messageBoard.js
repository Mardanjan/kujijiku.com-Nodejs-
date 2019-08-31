const Sequelize = require('sequelize');
const MySQLManager = require('../utils/SQLManager');



const messageBoard = MySQLManager.define('messageBoard', {
	  message: Sequelize.STRING,
	  delete_at:Sequelize.STRING,
});


//just a test


// messageBoard.create({
//     message:"this is the first message !",
// })
// 	.then((admin, err) => {
// 		console.log("add message success!")
// 	});





module.exports = messageBoard;

