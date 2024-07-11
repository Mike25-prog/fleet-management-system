const mysql = require('mysql');
const dotenv = require('dotenv');

dotenv.config();

let connection;

function handleDisconnect() {
    connection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        typeCast: true
    });

    connection.connect(err => {
        if (err) {
            console.error('Error connecting to MySQL Database:', err);
            setTimeout(handleDisconnect, 2000); // Delay before reconnecting
        } else {
            console.log('Connected to MySQL Database');
        }
    });

    connection.on('error', err => {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('MySQL connection lost. Reconnecting...');
            handleDisconnect();
        } else {
            throw err;
        }
    });
}

handleDisconnect();

module.exports = connection;
