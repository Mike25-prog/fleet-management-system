// src/components/EditTrip.js
import React, { useState } from 'react';
import './EditTrip.css'; // Ensure you have styles if needed

const EditTrip = ({ trip, onClose }) => {
    const [startLocation, setStartLocation] = useState(trip.start_location);
    const [endLocation, setEndLocation] = useState(trip.end_location);
    const [startTime, setStartTime] = useState(trip.start_time);
    const [endTime, setEndTime] = useState(trip.end_time);
    const [status, setStatus] = useState(trip.status);

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedTrip = { ...trip, start_location: startLocation, end_location: endLocation, start_time: startTime, end_time: endTime, status };

        fetch(process.env.REACT_APP_ENDPOINT+`/api/trips/${trip.id}` , {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedTrip),
        })
        .then(res => res.json())
        .then(data => {
            onClose();
         
        })
        .catch(error => console.error('Error updating trip:', error));
    };

    return (
        <div className="edit-trip-form">
            <h2>Edit Trip</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Start Location:
                    <input
                        type="text"
                        value={startLocation}
                        onChange={(e) => setStartLocation(e.target.value)}
                        required
                    />
                </label>
                <label>
                    End Location:
                    <input
                        type="text"
                        value={endLocation}
                        onChange={(e) => setEndLocation(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Start Time:
                    <input
                        type="datetime-local"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        required
                    />
                </label>
                <label>
                    End Time:
                    <input
                        type="datetime-local"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Status:
                    <input
                        type="text"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Save Changes</button>
            </form>
            <button onClick={onClose}>Close</button>
        </div>
    );
};

export default EditTrip;
