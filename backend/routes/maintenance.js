const express = require('express');
const router = express.Router();
const Maintenance =require('../models/Maintenance');
router.get('/', (req, res) => {
    Maintenance.getAll((err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

router.post('/', (req, res) => {
    Maintenance.writeNew(req.body, (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    }
    );
}
);
router.put('/:id', (req, res) => {
    Maintenance.update([req.body, req.params.id], (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    }
    );
}
);
router.delete('/:id', (req, res) => {
    Maintenance.delete(req.params.id, (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    }
    );
}
);


module.exports = router;