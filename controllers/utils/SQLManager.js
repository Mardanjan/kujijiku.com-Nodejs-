const baseAbsPath = __dirname + '/';

const Sequelize = require('sequelize');

const config = require('./configs.json');

let MySQLManager = connectToMysql();

function connectToMysql() {
	let host = config.host;
	let port = config.port;
	let dbname = config.dbname;
	let username = config.username;
	let password = config.password;

	try {
		let dbRef = new Sequelize(dbname, username, password, {
			host: host,
			port: port,
			dialect: 'mysql',
			pool: {
				max: 5,
				min: 0,
				idle: 10000
			}
		});
		console.log("connect mysql success");
		//初始化数据表
		dbRef.sync()
		return dbRef
	} catch(e) {
		console.log(e)
	}
}

module.exports = MySQLManager;
