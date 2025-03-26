// const connection = require("../config/db");

// const Vehicle = {
//     // 🚀 Get all vehicles
//     getAll: (callback) => {
//         const query = "SELECT * FROM vehicles";
//         connection.query(query, callback);
//     },

//     // 🚀 Get available vehicles (not assigned to an active trip)
//     getAvailableVehicles: (callback) => {
//         const query = `
//             SELECT number_plate, make, model, type, capacity
//             FROM vehicles
//             WHERE status = 'Available';
//         `;
//         connection.query(query, (err, results) => {
//             if (err) {
//                 console.error('Database query error:', err);
//                 return callback(err);
//             }
//             callback(null, results);
//         });
//     }, 

//     // 🚀 Add a new vehicle
//     // add: (data, callback) => {
//     //     const query = "INSERT INTO vehicles SET ?";
//     //     connection.query(query, data, callback);
//     // },

//     // Add a new vehicle with seat count
//     add: (data, callback) => {
//         const query = 'INSERT INTO vehicles (number_plate, seat_count) VALUES (?, ?)';
//         connection.query(query, [data.number_plate, data.seat_count], callback);
//     },

//  // Get seat count for a vehicle
//  getSeatCount: (number_plate, callback) => {
//     const query = 'SELECT seat_count FROM vehicles WHERE number_plate = ?';
//     connection.query(query, [number_plate], (err, results) => {
//         if (err) return callback(err);
//         if (results.length === 0) return callback(null, 0); // Default to 0 if vehicle not found
//         callback(null, results[0].seat_count);
//     });

// },

//     // 🚀 Update a vehicle by number plate
//     update: (number_plate, data, callback) => {
//         const query = "UPDATE vehicles SET ? WHERE number_plate = ?";
//         connection.query(query, [data, number_plate], callback);
//     },

//     // 🚀 Delete a vehicle by number plate
//     delete: (number_plate, callback) => {
//         const query = "DELETE FROM vehicles WHERE number_plate = ?";
//         connection.query(query, number_plate, callback);
//     }
// };

// module.exports = Vehicle;



















const connection = require("../config/db");

const Vehicle = {
    // 🚀 Get all vehicles
    getAll: (callback) => {
        const query = "SELECT * FROM vehicles";
        connection.query(query, callback);
    },

    // 🚀 Get available vehicles
    getAvailableVehicles: (callback) => {
        const query = "SELECT * FROM vehicles WHERE status = 'available'";
        connection.query(query, callback);
    },

    // 🚀 Get seat count for a vehicle
    getSeatCount: (number_plate, callback) => {
        const query = "SELECT seat_count FROM vehicles WHERE number_plate = ?";
        connection.query(query, [number_plate], (err, results) => {
            if (err) return callback(err);
            if (results.length === 0) return callback(null, 0); // Default to 0 if vehicle not found
            callback(null, results[0].seat_count);
        });
    },

    // 🚀 Add a new vehicle
    add: (data, callback) => {
        const query = "INSERT INTO vehicles SET ?";
        connection.query(query, data, callback);
    },

    // 🚀 Update vehicle details
    update: (number_plate, updateData, callback) => {
        const query = "UPDATE vehicles SET ? WHERE number_plate = ?";
        connection.query(query, [updateData, number_plate], callback);
    },

    // 🚀 Delete a vehicle
    delete: (number_plate, callback) => {
        const query = "DELETE FROM vehicles WHERE number_plate = ?";
        connection.query(query, [number_plate], callback);
    }
};

module.exports = Vehicle;

