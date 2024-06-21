const _query = require('../config/db').query;

const Incident={
    getAll:(callback)=>{
        const query ='SELECT * FROM incidents';
        _query(query,callback);
    },
    writeNew:(data,callback)=>{
        const query = 'INSERT INTO incidents SET ?';
        _query(query,data,callback)
    },
    update: (data, callback) => {
        const query = 'UPDATE incidents SET ? WHERE id = ?';
        _query(query, data, callback);
    },
    delete: (id, callback) => {
        const query = 'DELETE FROM incidents WHERE id = ?';
        _query(query, id, callback);
    }
}
module.exports = Incident;