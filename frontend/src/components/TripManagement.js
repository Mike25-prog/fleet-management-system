// src/components/TripManagement.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TripManagement = () => {
  const [trips, setTrips] = useState([]);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [formData, setFormData] = useState({
    vehicle_id: '',
    driver_id: '',
    start_location: '',
    end_location: '',
    start_time: '',
    end_time: '',
    cargo: '',
    contract_value: '',
  });

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    try {
      const response = await axios.get('http://4.221.79.76:5000/api/trips');
      setTrips(response.data);
    } catch (error) {
      console.error('Error fetching trips:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCreateTrip = async () => {
    try {
      await axios.post('http://4.221.79.76:5000/api/trips', formData);
      fetchTrips();
      setFormData({
        vehicle_id: '',
        driver_id: '',
        start_location: '',
        end_location: '',
        start_time: '',
        end_time: '',
        cargo: '',
        contract_value: '',
      });
    } catch (error) {
      console.error('Error creating trip:', error);
    }
  };

  const handleEditTrip = (id) => {
    const trip = trips.find(trip => trip.trip_id === id);
    setSelectedTrip(trip);
    setFormData({
      vehicle_id: trip.vehicle_id,
      driver_id: trip.driver_id,
      start_location: trip.start_location,
      end_location: trip.end_location,
      start_time: trip.start_time,
      end_time: trip.end_time,
      cargo: trip.cargo,
      contract_value: trip.contract_value,
    });
  };

  const handleUpdateTrip = async () => {
    try {
      await axios.put(`http://4.221.79.76:5000/api/trips/${selectedTrip.trip_id}`, formData);
      fetchTrips();
      setSelectedTrip(null);
    } catch (error) {
      console.error('Error updating trip:', error);
    }
  };

  const handleDeleteTrip = async (id) => {
    try {
      await axios.delete(`http://4.221.79.76:5000/api/trips/${id}`);
      fetchTrips();
    } catch (error) {
      console.error('Error deleting trip:', error);
    }
  };

  return (
    <div>
      <h1>Trip Management</h1>
      <div>
        <h2>Create or Edit Trip</h2>
        <form>
          <input
            type="text"
            name="vehicle_id"
            value={formData.vehicle_id}
            onChange={handleInputChange}
            placeholder="Vehicle ID"
          />
          <input
            type="text"
            name="driver_id"
            value={formData.driver_id}
            onChange={handleInputChange}
            placeholder="Driver ID"
          />
          <input
            type="text"
            name="start_location"
            value={formData.start_location}
            onChange={handleInputChange}
            placeholder="Start Location"
          />
          <input
            type="text"
            name="end_location"
            value={formData.end_location}
            onChange={handleInputChange}
            placeholder="End Location"
          />
          <input
            type="datetime-local"
            name="start_time"
            value={formData.start_time}
            onChange={handleInputChange}
            placeholder="Start Time"
          />
          <input
            type="datetime-local"
            name="end_time"
            value={formData.end_time}
            onChange={handleInputChange}
            placeholder="End Time"
          />
          <input
            type="text"
            name="cargo"
            value={formData.cargo}
            onChange={handleInputChange}
            placeholder="Cargo"
          />
          <input
            type="text"
            name="contract_value"
            value={formData.contract_value}
            onChange={handleInputChange}
            placeholder="Contract Value"
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
            <li key={trip.trip_id}>
              {trip.start_time} - {trip.start_location} to {trip.end_location}
              <button onClick={() => handleEditTrip(trip.trip_id)}>Edit</button>
              <button onClick={() => handleDeleteTrip(trip.trip_id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TripManagement;
