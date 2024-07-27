const express = require('express');
const bcrypt = require('bcrypt');
const Passenger = require('../models/Passenger'); // Ensure this path is correct

const router = express.Router();

// Register a new passenger
router.post('/register', async (req, res) => {
    const { first_name, last_name, email, password, contact_number } = req.body;

    try {
        // Check if the passenger already exists
        Passenger.findByEmail(email, async (err, existingPassenger) => {
            if (err) return res.status(500).json({ error: err.message });
            if (existingPassenger) return res.status(400).json({ error: 'Email already in use' });

            // Create the new passenger
            Passenger.create({ first_name, last_name, email, password, contact_number }, (err, result) => {
                if (err) return res.status(500).json({ error: err.message });

                res.status(201).json({ message: 'Passenger created successfully' });
            });
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Login a passenger
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the passenger by email
        Passenger.findByEmail(email, async (err, passenger) => {
            if (err) return res.status(500).json({ error: err.message });
            if (!passenger) return res.status(404).json({ error: 'Passenger not found' });

            try {
                // Compare the password
                const isMatch = await bcrypt.compare(password, passenger.password);
                console.log('Password Match:', isMatch);

                if (!isMatch) {
                    console.log('Invalid credentials for email:', email);
                    return res.status(401).json({ error: 'Invalid credentials' });
                }

                res.status(200).json({ message: 'Login successful', passenger });
            } catch (compareError) {
                console.error('Error comparing passwords:', compareError);
                return res.status(500).json({ error: compareError.message });
            }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
