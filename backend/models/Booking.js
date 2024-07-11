const connection = require('../config/db');

const Booking = {
    getAll: (callback) => {
        const query = 'SELECT * FROM bookings';
        connection.query(query, callback);
    },
    writeNew: (data, callback) => {
        const query = 'INSERT INTO bookings SET ?';
        connection.query(query, data, callback);
    },
    update: (data, callback) => {
        const query = 'UPDATE bookings SET ? WHERE id = ?';
        connection.query(query, data, callback);
    },
    delete: (id, callback) => {
        const query = 'DELETE FROM bookings WHERE id = ?';
        connection.query(query, id, callback);
    }
};

module.exports = Booking;