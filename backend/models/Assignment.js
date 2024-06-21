const _query = require('../config/db').query;

const Assignment = {
    getAll: (callback) => {
        const query = 'SELECT * FROM assignments';
        _query(query, callback);
    },
    writeNew: (data, callback) => {
        const query = 'INSERT INTO assignments SET ?';
        _query(query, data, callback);
    },
    update: (data, callback) => {
        const query = 'UPDATE assignments SET ? WHERE id = ?';
        _query(query, data, callback);
    },
    delete: (id, callback) => {
        const query = 'DELETE FROM assignments WHERE id = ?';
        _query(query, id, callback);
    }
};

module.exports = Assignment;