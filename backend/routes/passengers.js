const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Passenger = require('../models/Passenger');

// Register a new passenger
router.post('/register', async (req, res) => {
    const { first_name, last_name, email, password, contact_number } = req.body;
    
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const passenger = new Passenger({ first_name, last_name, email, password: hashedPassword, contact_number });

        await passenger.save();
        res.status(201).json({ message: 'Passenger created successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Login a passenger
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const passenger = await Passenger.findOne({ email });
        if (!passenger) return res.status(404).json({ error: 'Passenger not found' });

        const isMatch = await bcrypt.compare(password, passenger.password);
        if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

        res.status(200).json({ message: 'Login successful', passenger });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
