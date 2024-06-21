import {query as _query} from '../config/db';

const Location = {
    getAll: (callback) => {
        const query = 'SELECT * FROM locations';
        _query(query, callback);
    },
    writeNew: (data, callback) => {
        const query = 'INSERT INTO locations SET ?';
        _query(query, data, callback);
    },
    update: (data, callback) => {
        const query = 'UPDATE locations SET ? WHERE id = ?';
        _query(query, data, callback);
    },
    delete: (id, callback) => {
        const query = 'DELETE FROM locations WHERE id = ?';
        _query(query, id, callback);
    }
};