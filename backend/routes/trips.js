// routes/trips.js
const express = require('express');
const router = express.Router();
const Trip = require('../models/Trip');

router.get('/trips', async (req, res) => {
  const trips = await Trip.findAll();
  res.json(trips);
});

router.post('/trips', async (req, res) => {
  const { date, time, origin, destination, vehicleId, driverId } = req.body;
  const trip = await Trip.create({ date, time, origin, destination, vehicleId, driverId });
  res.json(trip);
});

router.put('/trips/:id', async (req, res) => {
  const { id } = req.params;
  const { date, time, origin, destination, vehicleId, driverId } = req.body;
  await Trip.update({ date, time, origin, destination, vehicleId, driverId }, { where: { id } });
  res.json({ message: 'Trip updated' });
});

router.delete('/trips/:id', async (req, res) => {
  const { id } = req.params;
  await Trip.destroy({ where: { id } });
  res.json({ message: 'Trip deleted' });
});

module.exports = router;
