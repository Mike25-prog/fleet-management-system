const connection = require('../config/db');

const FuelLog = {
    getAll: (callback) => {
        const query = 'SELECT * FROM fuel_logs';
        connection.query(query, callback);
    },
    writeNew: (data, callback) => {
        const query = 'INSERT INTO fuel_logs SET ?';
        connection.query(query, data, callback);
    },
    update: (data, callback) => {
        const query = 'UPDATE fuel_logs SET ? WHERE id = ?';
        connection.query(query, data, callback);
    },
    delete: (id, callback) => {
        const query = 'DELETE FROM fuel_logs WHERE id = ?';
        connection.query(query, id, callback);
    }
};
module.exports = FuelLog;