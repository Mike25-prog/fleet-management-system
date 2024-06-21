import { query as _query } from '../config/db';

const Vehicle = {
    getAll: (callback) => {
        const query = 'SELECT * FROM vehicles';
        _query(query, callback);
    },
    // Define other CRUD operations similarly
    writeNew: (data, callback) => {
        const query = 'INSERT INTO vehicles SET ?';
        _query(query, data, callback);
    },
    update: (data, callback) => {
        const query = 'UPDATE vehicles SET ? WHERE id = ?';
        _query(query, data, callback);
    },
    delete: (id, callback) => {
        const query = 'DELETE FROM vehicles WHERE id = ?';
        _query(query, id, callback);
    }

};

export default Vehicle;
