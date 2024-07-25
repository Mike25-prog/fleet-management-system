// src/components/VehicleMaintenance.js

import React, { useState } from 'react';

const Maintenance = () => {
  const [records, setRecords] = useState([]);
  const [vehicle, setVehicle] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [maintenanceType, setMaintenanceType] = useState('');
  const [mechanic, setMechanic] = useState('');
  const [cost, setCost] = useState('');
  const [notes, setNotes] = useState('');

  const handleAddRecord = () => {
    if (vehicle && date && description && maintenanceType && mechanic && cost) {
      setRecords([...records, { vehicle, date, description, maintenanceType, mechanic, cost, notes }]);
      setVehicle('');
      setDate('');
      setDescription('');
      setMaintenanceType('');
      setMechanic('');
      setCost('');
      setNotes('');
    } else {
      alert('Please fill out all required fields');
    }
  };

  return (
    <div>
      <h1>Shuttle Company Maintenance Records</h1>
      <div>
        <input
          type="text"
          placeholder="Vehicle ID/License Plate"
          value={vehicle}
          onChange={(e) => setVehicle(e.target.value)}
        />
        <input
          type="date"
          placeholder="Date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="Maintenance Type"
          value={maintenanceType}
          onChange={(e) => setMaintenanceType(e.target.value)}
        />
        <input
          type="text"
          placeholder="Mechanic/Service Center"
          value={mechanic}
          onChange={(e) => setMechanic(e.target.value)}
        />
        <input
          type="number"
          placeholder="Cost"
          value={cost}
          onChange={(e) => setCost(e.target.value)}
        />
        <input
          type="text"
          placeholder="Additional Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
        <button onClick={handleAddRecord}>Add Record</button>
      </div>
      <h2>Maintenance Records</h2>
      <ul>
        {records.map((record, index) => (
          <li key={index}>
            <strong>Vehicle:</strong> {record.vehicle}, <strong>Date:</strong> {record.date}, <strong>Description:</strong> {record.description}, <strong>Type:</strong> {record.maintenanceType}, <strong>Mechanic:</strong> {record.mechanic}, <strong>Cost:</strong> ${record.cost}, <strong>Notes:</strong> {record.notes}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Maintenance;
