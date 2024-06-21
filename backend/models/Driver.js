const connection = require('../config/db')


const Driver = {
    getAll: (callback) => {
        const query = 'SELECT * FROM drivers';
        connection.query(query, callback);
    },
    writeNew: (data, callback) => {
        const query = 'INSERT INTO drivers SET ?';
        connection.query(query, data, callback);
    },
    update: (data, callback) => {
        const query = 'UPDATE drivers SET ? WHERE id = ?';
        connection.query(query, data, callback);
    },
    delete: (id, callback) => {
        const query = 'DELETE FROM drivers WHERE id = ?';
        connection.query(query, id, callback);
    }
};
module.exports = Driver;
