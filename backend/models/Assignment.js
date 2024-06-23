const connection= require('../config/db');

const Assignment = {
    getAll: (callback) => {
        const query = 'SELECT * FROM assignments';
        connection.query(query, callback);
    },
    writeNew: (data, callback) => {
        const query = 'INSERT INTO assignments SET ?';
        connection.query(query, data, callback);
    },
    update: (data, callback) => {
        const query = 'UPDATE assignments SET ? WHERE id = ?';
        connection.query(query, data, callback);
    },
    delete: (id, callback) => {
        const query = 'DELETE FROM assignments WHERE id = ?';
        connection.query(query, id, callback);
    }
};

module.exports = Assignment;