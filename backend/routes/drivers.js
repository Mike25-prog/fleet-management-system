const express = require('express');
const router = express.Router();
const Driver = require('../models/Driver');
router.get('/', (req, res) => {
    Driver.getAll((err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

router.post('/', (req, res) => {
    Driver.writeNew(req.body, (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    }
    );
}
);
router.put('/:id', (req, res) => {
    Driver.update([req.body, req.params.id], (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    }
    );
}
);
router.delete('/:id', (req, res) => {
    Driver.delete(req.params.id, (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    }
    );
}
);


module.exports = router;