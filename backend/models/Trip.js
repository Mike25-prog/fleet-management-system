const connection = require('../config/db');

const Trip = {
  getAll: (callback) => {
    console.log('getAll callback:', callback);
    if(typeof callback !== 'function') {
      throw new TypeError('Callback must be a function');
    }
    const query = 'SELECT * FROM trips';
    connection.query(query, callback)
  },
  writeNew: (data, callback) => {
    console.log('writeNew data:', data);
    console.log('writeNew callback:', callback);
    if (typeof callback !== 'function') {
        throw new TypeError('Callback must be a function');
    }
    const query = 'INSERT INTO trips SET ?';
    const tripData = { 
        ...data
    };
    connection.query(query, tripData, (err, results) => {
        if (err) return callback(err);
        callback(null, results);
    });
},
update: (id, data, callback) => {
  console.log('update id:', id);
  console.log('update data:', data);
  console.log('update callback:', callback);
  if (typeof callback !== 'function') {
      throw new TypeError('Callback must be a function');
  }
  const query = 'UPDATE trips SET ? WHERE trip_id = ?';
  const tripData = { 
      ...data
  };
  connection.query(query, [tripData, id], (err, results) => {
      if (err) return callback(err);
      callback(null, results);
  });
},

delete: (id, callback) => {
  console.log('delete id:', id);
  console.log('delete callback:', callback);
  if (typeof callback !== 'function') {
      throw new TypeError('Callback must be a function');
  }
  const query = 'DELETE FROM trips WHERE trip_id = ?';
  connection.query(query, id, (err, results) => {
      if (err) return callback(err);
      callback(null, results);
  });
},
searchBy:(date, start_location, end_location, callback) =>{
  console.log('searchBy:', date, '\n', start_location, '\n', end_location);
  console.log('searchBy callback:', callback);

  if (typeof callback !== 'function') {
      throw new TypeError('Callback must be a function');
  }

  // query expects all three parameters
  const query = `
      SELECT * FROM trips 
      WHERE trip_date = ? 
      AND start_location = ? 
      AND end_location = ?
  `;
  connection.query(query, [date, start_location, end_location], (err, results) => {
      if (err) return callback(err);
      callback(null, results);
  });
},

}




module.exports = Trip;