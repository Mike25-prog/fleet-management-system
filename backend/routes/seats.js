// routes/seats.js
const express = require('express');
const Seat = require('../models/Seats');

const router = express.Router();

// Fetch seats for a specific trip
router.get('/:trip_id/seats', (req, res) => {
    const { trip_id } = req.params;
    console.log(`Request received for trip_id: ${trip_id}`); // Debugging
    Seat.findByTripId(trip_id, (error, seats) => {
      if (error) {
        console.error('Error fetching seats:', error); // Debugging
        return res.status(500).json({ error: 'Failed to fetch seats' });
      }
      if (seats.length === 0) {
        return res.status(404).json({ error: 'No seats found for this trip' });
      }
      res.json(seats);
    });
  });

// Book a seat
router.post('/:trip_id/seats/:seat_id/book', (req, res) => {
    const { trip_id, seat_id } = req.params;
    Seat.bookSeat(trip_id, seat_id, (error, success) => {
      if (error) {
        console.error('Error booking seat:', error);
        return res.status(500).json({ error: 'Failed to book seat' });
      }
      if (success) {
        res.json({ message: 'Seat booked successfully' });
      } else {
        res.status(404).json({ error: 'Seat not found or already booked' });
      }
    });
  });

// Unbook a seat
  router.post('/:trip_id/seats/:seat_id/unbook', (req, res) => {
    const { trip_id, seat_id } = req.params;
    Seat.unbookSeat(trip_id, seat_id, (error, success) => {
      if (error) {
        console.error('Error unbooking seat:', error);
        return res.status(500).json({ error: 'Failed to unbook seat' });
      }
      if (success) {
        res.json({ message: 'Seat unbooked successfully' });
      } else {
        res.status(404).json({ error: 'Seat not found or already unbooked' });
      }
    });
  });

module.exports = router;