 //const connection = require('../config/db');

// const Booking = {
//     getAll: (callback) => {
//         const query = 'SELECT * FROM bookings';
//         connection.query(query, callback);
//     },
//     writeNew: (data, callback) => {
//         const query = 'INSERT INTO bookings SET ?';
//         connection.query(query, data, callback);
//     },
//     update: (data, callback) => {
//         const query = 'UPDATE bookings SET ? WHERE id = ?';
//         connection.query(query, data, callback);
//     },
//     delete: (id, callback) => {
//         const query = 'DELETE FROM bookings WHERE id = ?';
//         connection.query(query, id, callback);
//     }
// };

// module.exports = Booking;










const db = require('../config/db');

const Booking = {
  create: (trip_id, ticket_value, passenger_id, seat_number, payment_status, transaction_id, callback) => {
    const sql = `
      INSERT INTO bookings (trip_id, ticket_value, passenger_id, seat_number, payment_status, transaction_id)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    db.query(sql, [trip_id, ticket_value, passenger_id, seat_number, payment_status, transaction_id], callback);
  },

  updatePaymentStatus: (booking_id, payment_status, transaction_id, callback) => {
    const sql = `
      UPDATE bookings 
      SET payment_status = ?, transaction_id = ? 
      WHERE booking_id = ?
    `;
    db.query(sql, [payment_status, transaction_id, booking_id], callback);
  }
};

module.exports = Booking;
