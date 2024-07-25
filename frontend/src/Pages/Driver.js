import React from 'react';

const Driver = ({ name, licenseNumber, vehicle }) => {
  return (
    <div className="driver-card">
      <h2>Driver Information</h2>
      <p><strong>Name:</strong> {name}</p>
      <p><strong>License Number:</strong> {licenseNumber}</p>
      <h3>Vehicle Details</h3>
      <p><strong>Make:</strong> {vehicle.make}</p>
      <p><strong>Model:</strong> {vehicle.model}</p>
      <p><strong>Year:</strong> {vehicle.year}</p>
    </div>
  );
};

export default Driver;