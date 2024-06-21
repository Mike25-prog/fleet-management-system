const express = require('express');
const router = express.Router();
const Vehicle = require('../models/Vehicle');

router.get('/', (req, res) => {
    Vehicle.getAll((err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// Define other CRUD operations similarly
router.post('/', (req, res) => {
    Vehicle.writeNew(req.body, (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    }
    );
}
);
router.put('/:id', (req, res) => {
    Vehicle.update([req.body, req.params.id], (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    }
    );
}
);
router.delete('/:id', (req, res) => {
    Vehicle.delete(req.params.id, (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    }
    );
}
);


module.exports = router;
