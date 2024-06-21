const _query = require('../config/db').query;


const Driver = {
    getAll: (callback) => {
        const query = 'SELECT * FROM drivers';
        _query(query, callback);
    },
    writeNew: (data, callback) => {
        const query = 'INSERT INTO drivers SET ?';
        _query(query, data, callback);
    },
    update: (data, callback) => {
        const query = 'UPDATE drivers SET ? WHERE id = ?';
        _query(query, data, callback);
    },
    delete: (id, callback) => {
        const query = 'DELETE FROM drivers WHERE id = ?';
        _query(query, id, callback);
    }
};
module.exports = Driver;
