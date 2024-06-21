import { query as _query } from '../config/db';

const Trip = {
    getAll: (callback) => {
        const query = 'SELECT * FROM trips';
        _query(query, callback);
    },
    writeNew: (data, callback) => {
        const query = 'INSERT INTO trips SET ?';
        _query(query, data, callback);
    },
    update: (data, callback) => {
        const query = 'UPDATE trips SET ? WHERE id = ?';
        _query(query, data, callback);
    },
    delete: (id, callback) => {
        const query = 'DELETE FROM trips WHERE id = ?';
        _query(query, id, callback);
    }
};