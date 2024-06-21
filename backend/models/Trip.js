const connection = require('../config/db');

const Trip = {
    getAll: (callback) => {
        const query = 'SELECT * FROM trips';
        connection.query(query, callback);
    },
    writeNew: (data, callback) => {
        const query = 'INSERT INTO trips SET ?';
        connection.query(query, data, callback);
    },
    update: (data, callback) => {
        const query = 'UPDATE trips SET ? WHERE id = ?';
        connection.query(query, data, callback);
    },
    delete: (id, callback) => {
        const query = 'DELETE FROM trips WHERE id = ?';
        connection.query(query, id, callback);
    }
};
module.exports = Trip;