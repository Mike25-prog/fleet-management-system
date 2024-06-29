import React, { useState } from 'react';
import {
  GoogleMap,
  LoadScript,
  Marker,
  useLoadScript,
  Geocoder,
} from '@react-google-maps/api';
import '@react-google-maps/api/dist/index.min.css'; // Optional for styling

const libraries = ['places']; // Required library for geocoding

const AddAssignment = () => {
  const [assignmentData, setAssignmentData] = useState({
    vehicle_id: '',
    driver_id: '',
    assignment_start_date: new Date().toISOString().slice(0, 10),
    assignment_end_date: '',
    startLocation: '',
    destinationLocation: '',
  });

  const [map, setMap] = useState(null);
  const [geocoder] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setAssignmentData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleStartDateChange = (event) => {
    setAssignmentData((prevData) => ({
      ...prevData,
      assignment_start_date: event.target.value,
    }));
  };

  const handleEndDateChange = (event) => {
    setAssignmentData((prevData) => ({
      ...prevData,
      assignment_end_date: event.target.value,
    }));
  };

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const mapContainerStyle = {
    width: '100%',
    height: '400px',
  };

  const center = {
    lat: 40.7128, // Replace with default latitude if needed
    lng: -74.0059, // Replace with default longitude if needed
  };

  const handleMapLoad = (mapInstance) => {
    setMap(mapInstance);
    geocoder = new window.google.maps.Geocoder();
  };

  const handleStartLocationChange = (event) => {
    setAssignmentData((prevData) => ({
      ...prevData,
      startLocation: event.target.value,
    }));

    if (geocoder) {
      geocoder.geocode({ address: event.target.value }, (results, status) => {
        if (status === 'OK' && results[0]) {
          const { lat, lng } = results[0].geometry.location;
          setMap(map => map.setCenter({ lat, lng }));
          setAssignmentData((prevData) => ({
            ...prevData,
            startLocation: results[0].formatted_address,
          }));
        } else {
          console.error('Geocoding error:', status);
        }
      });
    }
  };

  const handleDestinationLocationChange = (event) => {
    setAssignmentData((prevData) => ({
      ...prevData,
      destinationLocation: event.target.value,
    }));

    // Similar logic as handleStartLocationChange for destination
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Implement logic to send data to your backend API for assignment creation
    console.log('Assignment data:', assignmentData);
  };

  if (loadError) return 'Error loading maps';
  if (!isLoaded) return 'Loading maps...';

  return (
    <div className="container">
      <div className="form-container">
        <h2>Add Assignment</h2>
        <form className="add-form" onSubmit={handleSubmit}>
          <label className="add-label">
            Vehicle ID:
            <input
              className="add-input"
              required
              type="number"
              name="vehicle_id"
              value={assignmentData.vehicle_id}
              onChange={handleInputChange}
            />
          </label>
          <label className="add-label">
            Driver ID:
            <input
              className="add-input"
              required
              type="number"
              name="driver_id"
              value={assignmentData.driver_id}
              onChange={handleInputChange}
            />
            </label>
            <label className="add-label">
                Start Date:
                <input
                    className="add-input"
                    required
                    type="date"
                    name="assignment_start_date"
                    value={assignmentData.assignment_start_date}
                    onChange={handleStartDateChange}
                />
            </label>
            <label className="add-label">
                End Date:
                <input
                    className="add-input"
                    type="date"
                    name="assignment_end_date"
                    value={assignmentData.assignment_end_date}
                    onChange={handleEndDateChange}
                />
            </label>
            <label className="add-label">
                Start Location:
                <input
                    className="add-input"
                    required
                    type="text"
                    name="startLocation"
                    value={assignmentData.startLocation}
                    onChange={handleStartLocationChange}
                />
            </label>
            <label className="add-label">
                Destination Location:
                <input
                    className="add-input"
                    required
                    type="text"
                    name="destinationLocation"
                    value={assignmentData.destinationLocation}
                    onChange={handleDestinationLocationChange}
                />
            </label>
            <button className="add-button" type="submit">Add Assignment</button>
        </form>
        </div>
        <div className="map-container">
            <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
                <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    center={center}
                    zoom={10}
                    onLoad={handleMapLoad}
                >
                    <Marker position={center} />
                </GoogleMap>
            </LoadScript>
        </div>
    </div>
    );
}

export default AddAssignment;
