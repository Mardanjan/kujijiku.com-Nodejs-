const Sequelize = require('sequelize');
const MySQLManager = require('../utils/SQLManager');



const news = MySQLManager.define('news', {
     
      zhaiyao:Sequelize.STRING,

      //impotant!
      title:Sequelize.STRING,
      picUrl:Sequelize.STRING,
      url:Sequelize.STRING,
      type:Sequelize.STRING,
      ctime:Sequelize.STRING,

      delete_at:Sequelize.STRING,
      click:Sequelize.INTEGER,
      
});


module.exports = news;

