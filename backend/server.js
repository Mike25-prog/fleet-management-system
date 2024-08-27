const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch'); // Import node-fetch for Fetch API support in Node.js

// Debug statements
console.log('Current directory:', __dirname);
console.log('Files in routes directory:', fs.readdirSync(path.join(__dirname, 'routes')));

const vehicles = require('./routes/vehicles');
const drivers = require('./routes/drivers.js');
const assignment = require('./routes/assignment');
const fuellog = require('./routes/fuellog');
const maintenance = require('./routes/maintenance');
const trips = require('./routes/trips'); // Updated to match the correct file name
const incident = require('./routes/incident');
const location = require('./routes/location');
const user = require('./routes/user');
const passengers = require('./routes/passengers');
const bookings = require('./routes/bookings');

const app = express();
const corsOptions = {
    optionsSuccessStatus: 200 // Some legacy browsers choke on 204
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use('/api/vehicles', vehicles);
app.use('/api/drivers', drivers);
app.use('/api/assignment', assignment);
app.use('/api/fuellog', fuellog);
app.use('/api/maintenance', maintenance);
app.use('/api/trips', trips); // Updated to match the correct file name
app.use('/api/incident', incident);
app.use('/api/location', location);
app.use('/api/user', user);
app.use('/api/passengers', passengers);
app.use('/api/bookings', bookings);

app.get('/api/test', (req, res) => {
    res.status(200).send('This is a test endpoint');
});

// Daraja API Payment Route
const consumerKey = process.env.CONSUMER_KEY;
const consumerSecret = process.env.CONSUMER_SECRET;
const shortcode = process.env.SHORTCODE;
const passkey = process.env.PASSKEY;
const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');

const getToken = async () => {
    const response = await fetch(
        'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
        {
            method: 'GET',
            headers: {
                Authorization: `Basic ${auth}`,
            },
        }
    );
    const data = await response.json();
    return data.access_token;
};

app.post('/api/payment', async (req, res) => {
    const { phoneNumber, amount } = req.body;

    try {
        const accessToken = await getToken();
        const timestamp = new Date().toISOString().replace(/[-:T.]/g, '').slice(0, 14);
        const password = Buffer.from(shortcode + passkey + timestamp).toString('base64');

        const response = await fetch(
            'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    BusinessShortCode: shortcode,
                    Password: password,
                    Timestamp: timestamp,
                    TransactionType: 'CustomerPayBillOnline',
                    Amount: amount,
                    PartyA: phoneNumber,
                    PartyB: shortcode,
                    PhoneNumber: phoneNumber,
                    CallBackURL: 'https://your-callback-url.com/callback',
                    AccountReference: 'Booking123',
                    TransactionDesc: 'Payment for Booking',
                }),
            }
        );

        const responseData = await response.json();
        res.send(responseData);
    } catch (error) {
        console.error('Payment error:', error);
        res.status(500).send('Payment failed');
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});
