// src/components/TripManagement.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TripManagement = () => {
  const [trips, setTrips] = useState([]);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    origin: '',
    destination: '',
    vehicleId: '',
    driverId: '',
  });

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    const response = await axios.get('http://localhost:5000/api/trips');
    setTrips(response.data);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCreateTrip = async () => {
    await axios.post('http://localhost:5000/api/trips', formData);
    fetchTrips();
  };

  const handleEditTrip = async (id) => {
    const trip = trips.find(trip => trip.id === id);
    setSelectedTrip(trip);
    setFormData({
      date: trip.date,
      time: trip.time,
      origin: trip.origin,
      destination: trip.destination,
      vehicleId: trip.vehicleId,
      driverId: trip.driverId,
    });
  };

  const handleUpdateTrip = async () => {
    await axios.put(`http://localhost:5000/api/trips/${selectedTrip.id}`, formData);
    fetchTrips();
    setSelectedTrip(null);
  };

  const handleDeleteTrip = async (id) => {
    await axios.delete(`http://localhost:5000/api/trips/${id}`);
    fetchTrips();
  };

  return (
    <div>
      <h1>Trip Management</h1>
      <div>
        <h2>Create or Edit Trip</h2>
        <form>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
          />
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="origin"
            value={formData.origin}
            onChange={handleInputChange}
            placeholder="Origin"
          />
          <input
            type="text"
            name="destination"
            value={formData.destination}
            onChange={handleInputChange}
            placeholder="Destination"
          />
          <input
            type="text"
            name="vehicleId"
            value={formData.vehicleId}
            onChange={handleInputChange}
            placeholder="Vehicle ID"
          />
          <input
            type="text"
            name="driverId"
            value={formData.driverId}
            onChange={handleInputChange}
            placeholder="Driver ID"
          />
          {selectedTrip ? (
            <button type="button" onClick={handleUpdateTrip}>Update Trip</button>
          ) : (
            <button type="button" onClick={handleCreateTrip}>Create Trip</button>
          )}
        </form>
      </div>
      <div>
        <h2>Trips</h2>
        <ul>
          {trips.map(trip => (
            <li key={trip.id}>
              {trip.date} {trip.time} - {trip.origin} to {trip.destination}
              <button onClick={() => handleEditTrip(trip.id)}>Edit</button>
              <button onClick={() => handleDeleteTrip(trip.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TripManagement;
