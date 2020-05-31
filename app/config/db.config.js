module.exports = {
	host: 'localhost',
	port: 3306,
	user: process.env.USER_DB || 'root',
	password: process.env.PASSWORD_DB || '',
	database: process.env.DB_NAME || 'UNKLASS_API'
}


// CREATE TABLE IF NOT EXISTS `mahasiswa` (
//   id int(10) NOT NULL PRIMARY KEY AUTO_INCREMENT,
//   nama_lengkap varchar(255) NOT NULL,
//   nim varchar(10) NOT NULL,
//   semester int(1) NOT NULL,
//   jenis_kelamin varchar(1) NOT NULL,
//   status BOOLEAN DEFAULT false NOT NULL
// );
