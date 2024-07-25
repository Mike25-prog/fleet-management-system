// backend/routes/auth.js
const express = require('express');
const router = express.Router();

// Mock user data for demonstration purposes
const users = [
  { id: 1, username: 'admin', password: 'password' },
  { id: 2, username: 'user', password: 'password' }
];

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    res.json({ message: 'Login successful', user });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

module.exports = router;
