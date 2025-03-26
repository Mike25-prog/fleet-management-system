const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const axios = require('axios'); // Import axios for HTTP requests

// Debug statements
console.log('Current directory:', __dirname);
console.log('Files in routes directory:', fs.readdirSync(path.join(__dirname, 'routes')));

const vehicleRoutes = require('./routes/vehicles');
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
const seatsRouter = require('./routes/seats');
const mpesaRoutes = require("./routes/mpesa");



const app = express();
const corsOptions = {
    optionsSuccessStatus: 200 // Some legacy browsers choke on 204
};

app.use(express.json()); // ✅ Ensure JSON parsing
app.use(express.urlencoded({ extended: true }));

//app.use(cors(corsOptions));
//app.use(bodyParser.json());

app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse JSON request bodies

app.use('/api/vehicles', vehicleRoutes);
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
app.use("/mpesa", mpesaRoutes);
//app.use('/api/seats', seatRoutes);
app.use('/trips', seatsRouter); // Use the seats router for /trips routes
//app.use('/api/seats', seatsRouter);


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
    try {
        const response = await axios.get('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials', {
            headers: {
                Authorization: `Basic ${auth}`,
            },
        });
        return response.data.access_token;
    } catch (error) {
        console.error('Error fetching access token:', error);
        throw new Error('Failed to get access token');
    }
};

app.post('/api/payment', async (req, res) => {
    const { phoneNumber, amount } = req.body;

    try {
        const accessToken = await getToken();
        const timestamp = new Date().toISOString().replace(/[-:T.]/g, '').slice(0, 14);
        const password = Buffer.from(shortcode + passkey + timestamp).toString('base64');

        const response = await axios.post(
            'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
            {
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
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        res.send(response.data);
    } catch (error) {
        console.error('Payment error:', error);
        res.status(500).send('Payment failed');
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});
