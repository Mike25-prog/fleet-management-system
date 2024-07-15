const bcrypt = require('bcrypt');
const connection = require('../config/db');

const Passenger = {
    create: async (data, callback) => {
        try {
            console.log('Data received for passenger creation:', data);
            
            // Hash the password
            const hashedPassword = await bcrypt.hash(data.password, 10);
            
            // SQL query to insert a new passenger
            const query = 'INSERT INTO passengers SET ?';
            
            // Create a passenger object with hashed password
            const passengerData = { ...data, password: hashedPassword };
            console.log('Query and passengerData:', query, passengerData);
            
            // Execute the query
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
        // SQL query to find a passenger by email
        const query = 'SELECT * FROM passengers WHERE email = ?';
        
        // Execute the query
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
