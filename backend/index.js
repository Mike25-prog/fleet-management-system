// // backend/index.js
// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const sequelize = require('./models/db');
// const tripRoutes = require('./routes/trips');
// const userRoutes = require('./routes/user');


// const app = express();
// const port = process.env.PORT || 5000;

// app.use(cors());
// app.use(bodyParser.json());

// // Only include the necessary routes
// app.use('/api/trips', tripRoutes);
// app.use('/api/user', userRoutes);

// sequelize.sync().then(() => {
//   app.listen(port, () => {
//     console.log(`Server running on http://localhost:${port}`);
//   });
// });
