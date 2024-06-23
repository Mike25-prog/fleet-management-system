const bcrypt = require('bcrypt');
const connection = require('../config/db');

const User = {
    create: async (data, callback) => {
        try {
            console.log('Data received for user creation:', data);
            const hashedPassword = await bcrypt.hash(data.password, 10);
            const query = 'INSERT INTO users SET ?';
            const userData = { ...data, password: hashedPassword };
            console.log('Query and userData:', query, userData);
            connection.query(query, userData, (err, results) => {
                if (err) {
                    console.error('Error in query:', err);
                    return callback(err);
                }
                callback(null, results);
            });
        } catch (error) {
            console.error('Error in bcrypt:', error);
            callback(error);
        }
    },
    findByUsername: (username, callback) => {
        const query = 'SELECT * FROM users WHERE username = ?';
        connection.query(query, [username], (err, results) => {
            if (err) {
                console.error('Error in query:', err);
                return callback(err);
            }
            callback(null, results[0]);
        });
    }
};

module.exports = User;
