const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const vehicles = require('./routes/vehicles');
const drivers = require('./routes/drivers.js');
const assignment = require('./routes/assignment');
const fuellog = require('./routes/fuellog');
const maintenance = require('./routes/maintenance');
const trip = require('./routes/trip');
const incident = require('./routes/incident');
const location = require('./routes/location');
const user = require('./routes/user');
const e = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/vehicles', vehicles);
app.use('/api/drivers', drivers);
app.use('/api/assignment', assignment);
app.use('/api/fuellog', fuellog);
app.use('/api/maintenance', maintenance);
app.use('/api/trip', trip);
app.use('/api/incident', incident);
app.use('/api/location', location);
app.use('/api/user', user);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
