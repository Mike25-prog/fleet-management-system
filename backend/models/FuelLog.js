import {query as _query} from '../config/db';

const FuelLog = {
    getAll: (callback) => {
        const query = 'SELECT * FROM fuel_logs';
        _query(query, callback);
    },
    writeNew: (data, callback) => {
        const query = 'INSERT INTO fuel_logs SET ?';
        _query(query, data, callback);
    },
    update: (data, callback) => {
        const query = 'UPDATE fuel_logs SET ? WHERE id = ?';
        _query(query, data, callback);
    },
    delete: (id, callback) => {
        const query = 'DELETE FROM fuel_logs WHERE id = ?';
        _query(query, id, callback);
    }
};