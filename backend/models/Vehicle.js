const connection = require('../config/db');
const Vehicle = {
    getAll: (callback) => {
        const query = 'SELECT * FROM vehicles';
        connection.query(query, callback);
    },
    // Define other CRUD operations similarly
    writeNew: (data, callback) => {
        const query = 'INSERT INTO vehicles SET ?';
        connection.query(query, data, callback);
    },
    update: (data, callback) => {
        const query = 'UPDATE vehicles SET ? WHERE id = ?';
        connection.query(query, data, callback);
    },
    delete: (id, callback) => {
        const query = 'DELETE FROM vehicles WHERE id = ?';
        connection.query(query, id, callback);
    }

};

module.exports = Vehicle;