const connection = require('../config/db');

const Maintenance = {
    getAll: (callback) => {
        const query = 'SELECT * FROM maintenance';
        connection.query(query, callback);
    },
    writeNew: (data, callback) => {
        const query = 'INSERT INTO maintenance SET ?';
        connection.query(query, data, callback);
    },
    update: (data, callback) => {
        const query = 'UPDATE maintenance SET ? WHERE id = ?';
        connection.query(query, data, callback);
    },
    delete: (id, callback) => {
        const query = 'DELETE FROM maintenance WHERE id = ?';
        connection.query(query, id, callback);
    }
};
module.exports = Maintenance;