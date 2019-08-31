const Sequelize = require('sequelize');
const MySQLManager = require('../../utils/SQLManager');



const girls = MySQLManager.define('girls', {
      ctime:Sequelize.STRING,
      delete_at:Sequelize.STRING,
      title:Sequelize.STRING,
      picUrl:Sequelize.STRING,
      url:Sequelize.STRING,
      
});


module.exports = girls;