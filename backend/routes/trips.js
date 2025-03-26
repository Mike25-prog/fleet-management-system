// const express = require('express');
// const router = express.Router();
// const Trip = require('../models/Trip');

// router.get('/', (req, res) => {
//     Trip.getAll((err, results) => {
//         if (err) return res.status(500).send(err);
//         res.json(results);
//     });
// });


// router.post('/', (req, res) => {
//     console.log("Received request to add trip:", req.body); // <-- ADD THIS LINE
//     Trip.writeNew(req.body, (err, results) => {
//         if (err) {
//             console.error("Database insertion error:", err); // <-- ADD THIS LINE
//             return res.status(500).send(err);
//         }
//         res.json(results);
//     });
// });

// router.put('/:id', (req, res) => {
//     const tripId = req.params.id;
//     const tripData = req.body;

//     console.log(`🚀 PUT Request for Trip ID: ${tripId}`);
//     console.log("📦 Data Received:", tripData);

//     Trip.update(tripId, tripData, (err, results) => {
//         if (err) {
//             console.error("❌ Database Error:", err);
//             return res.status(500).json({ error: "Database error while updating trip" });
//         }

//         if (results.affectedRows === 0) {
//             return res.status(404).json({ error: "Trip not found" });
//         }

//         res.json({ message: "✅ Trip updated successfully!" });
//     });
// });



// router.delete('/:id', (req, res) => {
//     Trip.delete(req.params.id, (err, results) => {
//         if (err) return res.status(500).send(err);
//         res.json(results);
//     }
//     );
// }),
// //Search by date start location and end location
// router.get('/search', (req, res) => {
//     Trip.searchBy(req.query, (err, results) => {
//         if (err) return res.status(500).send(err);
//         res.json(results);
//     }
//     )
// })




// module.exports = router;




















const express = require('express');
const router = express.Router();
const Trip = require('../models/Trip');
const Vehicle = require('../models/Vehicle'); // Ensure you have this model

// Get all trips, including seat_count from vehicles
router.get('/', (req, res) => {
    Trip.getAll((err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// Create a new trip and fetch seat_count based on number_plate
router.post('/', async (req, res) => {
    console.log("Received request to add trip:", req.body);

    const { number_plate } = req.body; // Extract number_plate

    // Fetch seat_count for the vehicle
    Vehicle.getSeatCount(number_plate, (err, seat_count) => {
        if (err) {
            console.error("Error fetching seat count:", err);
            return res.status(500).send(err);
        }

        // Add seat_count to trip data
        const tripData = {
            ...req.body,
            seat_count: seat_count // Include seat count in the trip
        };

        // Now insert the trip with seat_count
        Trip.writeNew(tripData, (err, results) => {
            if (err) {
                console.error("Database insertion error:", err);
                return res.status(500).send(err);
            }
            res.json(results);
        });
    });
});

module.exports = router;

