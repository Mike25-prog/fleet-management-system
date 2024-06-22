const express = require('express');
const router = express.Router();
const FuelLog =require('../models/FuelLog');
router.get('/', (req, res) => {
    FuelLog.getAll((err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});
router.post('/', (req, res) => {
    FuelLog.writeNew(req.body, (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    }
    );
}
);
router.put('/:id', (req, res) => {
    FuelLog.update([req.body, req.params.id], (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    }
    );
}
);
router.delete('/:id', (req, res) => {
    FuelLog.delete(req.params.id, (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    }
    );
}
);
module.exports = router;