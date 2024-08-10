const express = require('express');
const router = express.Router();
const Trip = require('../models/Trip');

router.get('/', (req, res) => {
    Trip.getAll((err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// Define other CRUD operations similarly
router.post('/', (req, res) => {
    Trip.writeNew(req.body, (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    }
    );
}
);
router.put('/:id', (req, res) => {
    Trip.update(req.params.id,req.body, (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    }
    );
}
);
router.delete('/:id', (req, res) => {
    Trip.delete(req.params.id, (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    }
    );
}
);


module.exports = router;
