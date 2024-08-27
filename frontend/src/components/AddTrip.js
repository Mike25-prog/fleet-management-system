import React, { useState } from 'react';

const AddTrip = ({ onClose }) => {
    const [startLocation, setStartLocation] = useState('');
    const [endLocation, setEndLocation] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [status, setStatus] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const newTrip = { start_location: startLocation, end_location: endLocation, start_time: startTime, end_time: endTime, status };

        fetch(process.env.REACT_APP_ENDPOINT+'api/trips', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTrip)
        })
        .then(res => res.json())
        .then(data => {
            console.log('Trip added successfully:', data);
            onClose(); // Close the modal after adding the trip
        })
        .catch(error => console.error('Error adding trip:', error));
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Start Location:</label>
                <input type="text" value={startLocation} onChange={(e) => setStartLocation(e.target.value)} required />
            </div>
            <div>
                <label>End Location:</label>
                <input type="text" value={endLocation} onChange={(e) => setEndLocation(e.target.value)} required />
            </div>
            <div>
                <label>Start Time:</label>
                <input type="datetime-local" value={startTime} onChange={(e) => setStartTime(e.target.value)} required />
            </div>
            <div>
                <label>End Time:</label>
                <input type="datetime-local" value={endTime} onChange={(e) => setEndTime(e.target.value)} required />
            </div>
            <div>
                <label>Status:</label>
                <input type="text" value={status} onChange={(e) => setStatus(e.target.value)} required />
            </div>
            <button type="submit">Add Trip</button>
        </form>
    );
};

export default AddTrip;
