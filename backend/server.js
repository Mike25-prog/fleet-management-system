const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const vehicles = require('./routes/vehicles');
const drivers = require('./routes/drivers');
// Add other routes similarly

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/vehicles', vehicles);
app.use('/api/drivers', drivers);
// Use other routes similarly

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
