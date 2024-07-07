import React, { useEffect, useState } from 'react';
import SideBar from '../components/sideBar';
import AddVehicle from '../components/AddVehicle';
import EditVehicle from '../components/EditVehicle';
import './Vehicles.css';
const Vehicles = () => {
    const url = 'http://localhost:5000/api/vehicles';
    const [vehicles, setVehicles] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState(null);

    useEffect(() => {
        fetch(url, { method: 'GET',})
            .then(res => res.json())
            .then(data => setVehicles(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const openAddModal = () => {
        setModalContent(<AddVehicle onClose={() => setIsModalOpen(false)} />);
        setIsModalOpen(true);
    };

    const openEditModal = (vehicle) => {
        setModalContent(<EditVehicle vehicle={vehicle} onClose={() => setIsModalOpen(false)} />);
        setIsModalOpen(true);
    };

    const handleDelete = (id) => {
        // Implement delete functionality
        console.log(`Delete vehicle with id: ${id}`);
    };

    return (
        <div>
        <SideBar/>
        <div className='vehicle-container'>
            <div className="content-area">
                <table>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>number plate</th>
                            <th>make</th>
                            <th>model</th>
                            <th>year</th>
                            <th>status</th>
                            <th>type</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vehicles.map((vehicle) => (
                            <tr key={vehicle.id}>
                                <td>{vehicle.id}</td>
                                <td>{vehicle.number_plate}</td>
                                <td>{vehicle.make}</td>
                                <td>{vehicle.model}</td>
                                <td>{vehicle.year}</td>
                                <td>{vehicle.status}</td>
                                <td>{vehicle.type}</td>
                                <td>
                                    <button className="edit-button" onClick={() => openEditModal(vehicle)}>Edit</button>
                                    <button className="delete-button" onClick={() => handleDelete(vehicle.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button className="add-button" onClick={openAddModal}>Add New Vehicle</button>
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

export default Vehicles;