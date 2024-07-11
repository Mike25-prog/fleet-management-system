const connection = require('../config/db');

const Passenger = {
    getAll: (callback) => {
        const query = 'SELECT * FROM passengers';
        connection.query(query, callback);
    },
    writeNew: (data, callback) => {
        const query = 'INSERT INTO passengers SET ?';
        connection.query(query, data, callback);
    },
    update: (data, callback) => {
        const query = 'UPDATE passengers SET ? WHERE id = ?';
        connection.query(query, data, callback);
    },
    delete: (id, callback) => {
        const query = 'DELETE FROM passengers WHERE id = ?';
        connection.query(query, id, callback);
    }
};

module.exports = Passenger;