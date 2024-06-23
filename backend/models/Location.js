const connection = require('../config/db');

const Location = {
    getAll: (callback) => {
        const query = 'SELECT * FROM locations';
        connection.query(query, callback);
    },
    writeNew: (data, callback) => {
        const query = 'INSERT INTO locations SET ?';
        connection.query(query, data, callback);
    },
    update: (data, callback) => {
        const query = 'UPDATE locations SET ? WHERE id = ?';
        connection.query(query, data, callback);
    },
    delete: (id, callback) => {
        const query = 'DELETE FROM locations WHERE id = ?';
        connection.query(query, id, callback);
    }
};
module.exports = Location;  