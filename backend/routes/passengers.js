const express = require('express');
const router = express.Router();
const Passenger = require('../models/Passenger');
router.get('/', (req, res) => {
    Passenger.getAll((err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

router.post('/', (req, res) => {
    Passenger.writeNew(req.body, (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
})

router.put('/:id', (req, res) => {
    Passenger.update([req.body, req.params.id], (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
})

router.delete('/:id', (req, res) => {
    Passenger.delete(req.params.id, (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
})

module.exports = router;