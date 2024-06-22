const connection = require('./config/db');

connection.query('SELECT 1 + 1 AS solution', (err, results) => {
    if (err) throw err;
    console.log('The solution is: ', results[0].solution);
    connection.end();
});
