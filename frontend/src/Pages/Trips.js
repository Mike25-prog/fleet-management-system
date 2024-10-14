import React, { useEffect, useState } from 'react';
import SideBar from '../components/sideBar'; // Ensure SideBar component exists
import AddTrip from '../components/AddTrip'; // Ensure AddTrip component exists
import EditTrip from '../components/EditTrip'; // Ensure EditTrip component exists
import './Trips.css';

const Trips = () => {
    const url = process.env.REACT_APP_ENDPOINT+'api/trips'; // Ensure this endpoint is correct
    const [trips, setTrips] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState(null);

    // Fetch trips data when the component mounts
    useEffect(() => {
        fetch(url, { method: 'GET' })
            .then(res => res.json())
            .then(data => setTrips(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    // Function to open the add trip modal
    const openAddModal = () => {
        setModalContent(<AddTrip onClose={() => setIsModalOpen(false)} />);
        setIsModalOpen(true);
    };

    // Function to open the edit trip modal
    const openEditModal = (trip) => {
        setModalContent(<EditTrip trip={trip} onClose={() => setIsModalOpen(false)} />);
        setIsModalOpen(true);
    };

    // Function to handle trip deletion
    const handleDelete = (id) => {
        fetch(`${url}/${id}`, {
            method: 'DELETE'
        })
        .then(res => {
            if (res.ok) {
                setTrips(trips.filter(trip => trip.id !== id));
            } else {
                console.error('Failed to delete trip');
            }
        })
        .catch(error => console.error('Error deleting trip:', error));
    };

    return (
        <div>
            <SideBar />
            <div style={{
        position: 'absolute',
        left: 130,
        top: 50,
        width: '90%',
        
      }}>
                <div className="content-area">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Start Location</th>
                                <th>End Location</th>
                                <th>Start Time</th>
                                <th>End Time</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(trips) && trips.map((trip) => (
                                <tr key={trip.id}>
                                    <td>{trip.id}</td>
                                    <td>{trip.start_location}</td>
                                    <td>{trip.end_location}</td>
                                    <td>{trip.start_time}</td>
                                    <td>{trip.end_time}</td>
                                    <td>{trip.status}</td>
                                    <td>
                                        <button className="edit-button" onClick={() => openEditModal(trip)}>Edit</button>
                                        <button className="delete-button" onClick={() => handleDelete(trip.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button className="add-button" onClick={openAddModal}>Add New Trip</button>
                </div>
                {isModalOpen && (
                    <div className="modal">
                        <div className="modal-content">
                            {modalContent}
                            <button className="close-button" onClick={() => setIsModalOpen(false)}>Close</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Trips;
