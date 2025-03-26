// models/Seat.js
const db = require('../config/db');

  // Fetch all seats for a specific trip
  class Seat {
    static findByTripId(tripId, callback) {
      console.log(`Fetching seats for trip_id: ${tripId}`); // Debugging
      db.query('SELECT * FROM seats WHERE trip_id = ?', [tripId], (error, results) => {
        if (error) {
          console.error('Error in findByTripId:', error); // Debugging
          return callback(error, null);
        }
        console.log('Seats fetched:', results); // Debugging
        callback(null, results);
      });
    }

  // Book a seat
  static bookSeat(tripId, seatId, callback) {
    const query = 'UPDATE seats SET is_booked = true WHERE seat_id = ? AND trip_id = ?';
    db.query(query, [seatId, tripId], (error, result) => {
      if (error) {
        console.error('Error booking seat:', error);
        return callback(error, null);
      }
      callback(null, result.affectedRows > 0);
    });
  }

  // Unbook a seat
  static unbookSeat(tripId, seatId, callback) {
    const query = 'UPDATE seats SET is_booked = false WHERE seat_id = ? AND trip_id = ?';
    db.query(query, [seatId, tripId], (error, result) => {
      if (error) {
        console.error('Error unbooking seat:', error);
        return callback(error, null);
      }
      callback(null, result.affectedRows > 0);
    });
  }
}

module.exports = Seat;