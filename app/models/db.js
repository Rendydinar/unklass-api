const mysql = require('mysql');
const dbConfig = require('../config/db.config');

const connection = mysql.createPool({
	host: dbConfig.host,
	port: dbConfig.port,
	user: dbConfig.user,
	password: dbConfig.password,
	database: dbConfig.database
});

module.exports = connection;
