import {query as _query} from '../config/db';

const Maintenance = {
    getAll: (callback) => {
        const query = 'SELECT * FROM maintenance';
        _query(query, callback);
    },
    writeNew: (data, callback) => {
        const query = 'INSERT INTO maintenance SET ?';
        _query(query, data, callback);
    },
    update: (data, callback) => {
        const query = 'UPDATE maintenance SET ? WHERE id = ?';
        _query(query, data, callback);
    },
    delete: (id, callback) => {
        const query = 'DELETE FROM maintenance WHERE id = ?';
        _query(query, id, callback);
    }
};