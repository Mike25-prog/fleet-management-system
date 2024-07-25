const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');

// Register a new user
router.post('/register', async (req, res) => {
    const { username, password, first_name, last_name, email } = req.body;
    User.create({ username, password, first_name, last_name, email }, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
       if(!err){return res.status(201).json({ message: 'User created successfully' })};
    });
});

// Login a user
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    User.findByUsername(username, async (err, user) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!user) return res.status(404).json({ error: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

        if(isMatch){return res.status(200).json({ message: 'Login successful', user })};
    });
});

module.exports = router;
