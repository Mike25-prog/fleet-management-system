const bcrypt = require('bcrypt');
const connection = require('../config/db');

const Passenger = {
    create: async (data, callback) => {
        try {
            console.log('Data received for passenger creation:', data);
            const hashedPassword = await bcrypt.hash(data.password, 10);
            const query = 'INSERT INTO passengers SET ?';
            const passengerData = { ...data, password: hashedPassword };
            console.log('Query and passengerData:', query, passengerData);
            connection.query(query, passengerData, (err, results) => {
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
    findByEmail: (email, callback) => {
        const query = 'SELECT * FROM passengers WHERE email = ?';
        connection.query(query, [email], (err, results) => {
            if (err) {
                console.error('Error in query:', err);
                return callback(err);
            }
            callback(null, results[0]);
        });
    }
};

module.exports = Passenger;
