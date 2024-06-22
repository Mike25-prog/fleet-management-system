const express = require('express');
const router = express.Router();
const Location =require('../models/Location');
router.get('/', (req, res) => {
    Location.getAll((err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

router.post('/', (req, res) => {
    Location.writeNew(req.body, (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    }
    );
}
);
router.put('/:id', (req, res) => {
    Location.update([req.body, req.params.id], (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    }
    );
}
);
router.delete('/:id', (req, res) => {
    Location.delete(req.params.id, (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    }
    );
}
);


module.exports = router;