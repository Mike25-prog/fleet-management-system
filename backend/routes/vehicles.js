// const express = require("express");
// const router = express.Router();
// const connection = require("../config/db");
// const Vehicle = require("../models/Vehicle");

// // 🚀 GET all vehicles
// router.get("/", (req, res) => {
//     const query = "SELECT * FROM vehicles";
//     connection.query(query, (err, results) => {
//         if (err) {
//             console.error("Error fetching vehicles:", err);
//             return res.status(500).json({ error: err.message });
//         }
//         res.json(results);
//     });
// });

// router.get("/available", (req, res) => {
//     Vehicle.getAvailableVehicles((err, results) => {
//         if (err) {
//             console.error("Error fetching available vehicles:", err);
//             return res.status(500).json({ error: "Server error" });
//         }
//         res.json(results);
//     });
// });

// // Get seat count for a specific vehicle by number_plate
// router.get('/seatCount/:number_plate', (req, res) => {
//     const numberPlate = req.params.number_plate;

//     const query = 'SELECT seat_count FROM vehicles WHERE number_plate = ?';
//     connection.query(query, [numberPlate], (err, results) => {
//         if (err) return res.status(500).json({ error: err.message });
        
//         if (results.length === 0) {
//             return res.status(404).json({ error: 'Vehicle not found' });
//         }

//         res.json({ seat_count: results[0].seat_count });
//     });
// });

// // 🚀 POST a new vehicle (Add `capacity`)
// router.post("/", (req, res) => {
//     const { number_plate, make, model, year, status, type, capacity } = req.body;

//     if (!number_plate || !make || !model || !year || !status || !type || !capacity) {
//         return res.status(400).json({ error: "All fields are required" });
//     }

//     const query = "INSERT INTO vehicles SET ?";
//     const vehicleData = { number_plate, make, model, year, status, type, capacity };

//     connection.query(query, vehicleData, (err, results) => {
//         if (err) {
//             console.error("Error adding vehicle:", err);
//             return res.status(500).json({ error: err.message });
//         }
//         res.status(201).json({ message: "Vehicle added successfully", vehicle: vehicleData });
//     });
// });

// // 🚀 PUT (update vehicle details, including `capacity`)
// router.put("/:number_plate", (req, res) => {
//     const { number_plate } = req.params;
//     const updateData = req.body;

//     const query = "UPDATE vehicles SET ? WHERE number_plate = ?";
    
//     connection.query(query, [updateData, number_plate], (err, results) => {
//         if (err) {
//             console.error("Error updating vehicle:", err);
//             return res.status(500).json({ error: err.message });
//         }
//         if (results.affectedRows === 0) {
//             return res.status(404).json({ error: "Vehicle not found" });
//         }
//         res.json({ message: "Vehicle updated successfully" });
//     });
// });

// // 🚀 DELETE a vehicle
// router.delete("/:number_plate", (req, res) => {
//     const { number_plate } = req.params;
//     const query = "DELETE FROM vehicles WHERE number_plate = ?";

//     connection.query(query, number_plate, (err, results) => {
//         if (err) {
//             console.error("Error deleting vehicle:", err);
//             return res.status(500).json({ error: err.message });
//         }
//         if (results.affectedRows === 0) {
//             return res.status(404).json({ error: "Vehicle not found" });
//         }
//         res.json({ message: "Vehicle deleted successfully" });
//     });
// });

// module.exports = router;



















const express = require("express");
const router = express.Router();
const Vehicle = require("../models/Vehicle");

// 🚀 GET all vehicles
router.get("/", (req, res) => {
    Vehicle.getAll((err, results) => {
        if (err) {
            console.error("Error fetching vehicles:", err);
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// 🚀 GET available vehicles
router.get("/available", (req, res) => {
    Vehicle.getAvailableVehicles((err, results) => {
        if (err) {
            console.error("Error fetching available vehicles:", err);
            return res.status(500).json({ error: "Server error" });
        }
        res.json(results);
    });
});

// 🚀 GET seat count for a vehicle
router.get('/seatCount/:number_plate', (req, res) => {
    const numberPlate = req.params.number_plate;

    Vehicle.getSeatCount(numberPlate, (err, seat_count) => {
        if (err) return res.status(500).json({ error: err.message });

        if (seat_count === 0) {
            return res.status(404).json({ error: "Vehicle not found" });
        }

        res.json({ seat_count });
    });
});

// 🚀 POST a new vehicle
router.post("/", (req, res) => {
    const { number_plate, make, model, year, status, type, seat_count } = req.body;

    if (!number_plate || !make || !model || !year || !status || !type || !seat_count) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const vehicleData = { number_plate, make, model, year, status, type, seat_count };

    Vehicle.add(vehicleData, (err, results) => {
        if (err) {
            console.error("Error adding vehicle:", err);
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: "Vehicle added successfully", vehicle: vehicleData });
    });
});

// 🚀 PUT (update vehicle details)
router.put("/:number_plate", (req, res) => {
    const { number_plate } = req.params;
    const updateData = req.body;

    Vehicle.update(number_plate, updateData, (err, results) => {
        if (err) {
            console.error("Error updating vehicle:", err);
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: "Vehicle not found" });
        }
        res.json({ message: "Vehicle updated successfully" });
    });
});

// 🚀 DELETE a vehicle
router.delete("/:number_plate", (req, res) => {
    const { number_plate } = req.params;

    Vehicle.delete(number_plate, (err, results) => {
        if (err) {
            console.error("Error deleting vehicle:", err);
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: "Vehicle not found" });
        }
        res.json({ message: "Vehicle deleted successfully" });
    });
});

module.exports = router;
