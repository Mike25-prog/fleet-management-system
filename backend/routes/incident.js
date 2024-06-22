const express = require('express');
const router = express.Router();
const Incident =require('../models/Incident');
router.get('/', (req, res) => {
    Incident.getAll((err, results) => {
        if (err) return res.status(500).send(err)
        res.json(results);
    }
    );
}
);
// Define other CRUD operations similarly
router.post('/', (req, res) => {
    Incident.writeNew(req.body, (err, results) => {
        if (err) return res.status(500).send(err)
        res.json(results);
    }
    );
}
);
router.put('/:id', (req, res) => {
    Incident.update([req.body, req.params.id], (err, results) => {
        if (err) return res.status(500).send(err)
        res.json(results);
    }
    );
}
);
router.delete('/:id', (req, res) => {
    Incident.delete(req.params.id, (err, results) => {
        if (err) return res.status(500).send(err)
        res.json(results);
    }
    );
}
);
module.exports = router;