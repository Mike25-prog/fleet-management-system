const connection = require('../config/db');
const moment = require('moment');


    //const Trip = {
        // getAll: (callback) => {
        //     const sql = `
        //         SELECT trips.*, vehicles.seat_count 
        //         FROM trips 
        //         JOIN vehicles ON trips.number_plate = vehicles.number_plate
        //     `;
        //     connection.query(sql, callback);
        // },

        const Trip = {
        getAll: (callback) => {
            console.log('Fetching all trips...');
            if (typeof callback !== 'function') {
                throw new TypeError('Callback must be a function');
            }
        
            const query = `
                SELECT trips.*, vehicles.seat_count 
                FROM trips 
                JOIN vehicles ON trips.number_plate = vehicles.number_plate
            `;
        
            connection.query(query, callback);
        },
        

    // writeNew: (data, callback) => {
    //     console.log('writeNew data:', data);
        
    //     if (typeof callback !== 'function') {
    //         throw new TypeError('Callback must be a function');
    //     }
    //     const tripData = {
    //         number_plate: data.number_plate,  // Use number_plate instead of vehicle_id
    //         start_location: data.start_location,
    //         end_location: data.end_location,
    //         start_time: moment.utc(data.start_time).format('YYYY-MM-DD HH:mm:ss'),
    //         end_time: moment.utc(data.end_time).format('YYYY-MM-DD HH:mm:ss'),
    //         passengers: data.passengers,
    //         contract_value: data.contract_value
    //     };
        
    
    //     const query = 'INSERT INTO trips SET ?';
    
    //     console.log("Executing query:", query, "with data:", tripData);  // <-- ADD THIS LINE
    
    //     connection.query(query, tripData, (err, results) => {
    //         if (err) {
    //             console.error("MySQL Error:", err);  // <-- LOG ERRORS
    //             return callback(err);
    //         }
    //         callback(null, results);
    //     });
    // },

    //Updated wtiteNew method to fetch the seat count from the vehicles table using the number_plate
    writeNew: (data, callback) => {
        console.log('writeNew data:', data);
        
        if (typeof callback !== 'function') {
            throw new TypeError('Callback must be a function');
        }
    
        // First, get the seat_count from vehicles based on number_plate
        const seatQuery = 'SELECT seat_count FROM vehicles WHERE number_plate = ?';
    
        connection.query(seatQuery, [data.number_plate], (err, results) => {
            if (err) {
                console.error("MySQL Error (fetching seat count):", err);
                return callback(err);
            }
    
            if (results.length === 0) {
                return callback(new Error("Vehicle not found"));
            }
    
            const seat_count = results[0].seat_count; // Get seat count
    
            // Now insert the trip with seat_count
            const tripData = {
                number_plate: data.number_plate,
                start_location: data.start_location,
                end_location: data.end_location,
                start_time: moment.utc(data.start_time).format('YYYY-MM-DD HH:mm:ss'),
                end_time: moment.utc(data.end_time).format('YYYY-MM-DD HH:mm:ss'),
                
                contract_value: data.contract_value,
                seat_count: seat_count // Include seat_count
            };
    
            const query = 'INSERT INTO trips SET ?';
    
            console.log("Executing query:", query, "with data:", tripData);
    
            connection.query(query, tripData, (err, results) => {
                if (err) {
                    console.error("MySQL Error:", err);
                    return callback(err);
                }
                callback(null, results);
            });
        });
    },
    
    


    update: (id, data, callback) => {
        console.log('update id:', id);
        console.log('update data:', data);

        if (typeof callback !== 'function') {
            throw new TypeError('Callback must be a function');
        }

        // Convert timestamps to MySQL DATETIME format
        const formattedData = {
            ...data,
            start_time: moment.utc(data.start_time).format('YYYY-MM-DD HH:mm:ss'),
            end_time: moment.utc(data.end_time).format('YYYY-MM-DD HH:mm:ss')
        };

        const query = 'UPDATE trips SET ? WHERE trip_id = ?';
        connection.query(query, [formattedData, id], (err, results) => {
            if (err) {
                console.error("❌ Database Update Error:", err); // Log full error
                return callback(err);
            }
            callback(null, results);
        });
    },

    delete: (id, callback) => {
        console.log('delete id:', id);
        console.log('delete callback:', callback);
        if (typeof callback !== 'function') {
            throw new TypeError('Callback must be a function');
        }
        const query = 'DELETE FROM trips WHERE trip_id = ?';
        connection.query(query, id, (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },

    searchBy: (date, start_location, end_location, callback) => {
        console.log('searchBy:', date, '\n', start_location, '\n', end_location);
        console.log('searchBy callback:', callback);

        if (typeof callback !== 'function') {
            throw new TypeError('Callback must be a function');
        }

        // Convert date to MySQL format if needed
        const formattedDate = moment.utc(date).format('YYYY-MM-DD');

        const query = `
            SELECT * FROM trips 
            WHERE trip_date = ? 
            AND start_location = ? 
            AND end_location = ?
        `;
        connection.query(query, [formattedDate, start_location, end_location], (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    }
};

module.exports = Trip;
