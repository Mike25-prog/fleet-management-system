// models/Trip.js
const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const Trip = sequelize.define('Trip', {
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  time: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  origin: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  destination: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  vehicleId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  driverId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'trips',
  timestamps: false,
});

module.exports = Trip;
