const connection = require('../config/db');

const Vehicle = {
    getAll: (callback) => {
        console.log('getAll callback:', callback);
        if (typeof callback !== 'function') {
            throw new TypeError('Callback must be a function');
        }
        const query = 'SELECT * FROM vehicles';
        connection.query(query, callback);
    },
    writeNew: (data, callback) => {
        console.log('writeNew data:', data);
        console.log('writeNew callback:', callback);
        if (typeof callback !== 'function') {
            throw new TypeError('Callback must be a function');
        }
        const query = 'INSERT INTO vehicles SET ?';
        const vehicleData = { 
            ...data, 
            location_details: JSON.stringify(data.location_details) 
        };
        connection.query(query, vehicleData, (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },
    update: (id, data, callback) => {
        console.log('update id:', id);
        console.log('update data:', data);
        console.log('update callback:', callback);
        if (typeof callback !== 'function') {
            throw new TypeError('Callback must be a function');
        }
        const query = 'UPDATE vehicles SET ? WHERE vehicle_id = ?';
        const vehicleData = { 
            ...data, 
            location_details: JSON.stringify(data.location_details) 
        };
        connection.query(query, [vehicleData, id], (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },
    delete: (id, callback) => {
        console.log('delete id:', id);
        console.log('delete callback:', callback);
        if (typeof callback !== 'function') {
            throw new TypeError('Callback must be a function');
        }
        const query = 'DELETE FROM vehicles WHERE vehicle_id = ?';
        connection.query(query, id, (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    }
};

module.exports = Vehicle;
