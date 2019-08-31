const Sequelize = require('sequelize');
const MySQLManager = require('../utils/SQLManager');



const myJokes = MySQLManager.define('myJokes', {
      content:Sequelize.STRING,
      delete_at:Sequelize.STRING,
      
});


module.exports = myJokes;

