const connection = require('../config/db');

const Location = {
    getAll: (callback) => {
        const query = 'SELECT * FROM locations';
        connection.query(query, callback);
    },
    writeNew: (data, callback) => {
        const query = 'INSERT INTO locations SET ?';
        const locationData = {
            ...data,location_details: JSON.stringify(data.location_details)
        }
        connection.query(query, locationData, callback);
    },
    update: (data, callback) => {
        const query = 'UPDATE locations SET ? WHERE id = ?';
        const locationData = {
            ...data,location_details: JSON.stringify(data.location_details)
        }
        connection.query(query, locationData, callback);
    },
    delete: (id, callback) => {
        const query = 'DELETE FROM locations WHERE id = ?';
        connection.query(query, id, callback);
    }
};
module.exports = Location;  