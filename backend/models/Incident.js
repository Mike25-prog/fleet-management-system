const connection = require('../config/db');

const Incident={
    getAll:(callback)=>{
        const query ='SELECT * FROM incidents';
        connection.query(query,callback);
    },
    writeNew:(data,callback)=>{
        const query = 'INSERT INTO incidents SET ?';
        connection.query(query,data,callback)
    },
    update: (data, callback) => {
        const query = 'UPDATE incidents SET ? WHERE id = ?';
        connection.query(query, data, callback);
    },
    delete: (id, callback) => {
        const query = 'DELETE FROM incidents WHERE id = ?';
        connection.query(query, id, callback);
    }
}
module.exports = Incident;