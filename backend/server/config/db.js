const mysql = require('mysql2')

const pool = mysql.createPool({
	host: process.env.DB_HOST || 'http://localhost:3306/',
	user: process.env.DB_USER || 'user',
	password: process.env.DB_PASSWORD || 'password',
	database: process.env.DB_NAME || 'barfinder',
	waitForConnections: true,
	connectionLimit: 10,
	queueLimit: 0,
})

module.exports = pool.promise()
