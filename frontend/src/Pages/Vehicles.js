import React, { useEffect, useState } from 'react';
import SideBar from '../components/sideBar';
import AddVehicle from '../components/AddVehicle';
import EditVehicle from '../components/EditVehicle';
import './Vehicles.css';

const Vehicles = () => {
    const url = 'http://4.221.79.76:5000/api/vehicles';
    const [vehicles, setVehicles] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState(null);

    useEffect(() => {
        fetch(url, { method: 'GET' })
            .then(res => res.json())
            .then(data => setVehicles(data))
            .catch(error => console.error('Error fetching data:', error));
    }, [vehicles]);

    const openAddModal = () => {
        setModalContent(<AddVehicle onClose={() => setIsModalOpen(false)} />);
        setIsModalOpen(true);
    };

    const openEditModal = (vehicle) => {
        setModalContent(<EditVehicle vehicle={vehicle} onClose={() => setIsModalOpen(false)} />);
        setIsModalOpen(true);
    };

    const handleDelete = (id) => {
        console.log(url+id)
        fetch(`${url}/${id}`, {
            method: 'DELETE'
        })
        .then(res => {
            if (res.ok) {
                setVehicles(vehicles.filter(vehicle => vehicle.id !== id));
            } else {
                console.error('Failed to delete vehicle');
            }
        })
        .catch(error => console.error('Error deleting vehicle:', error));
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
                                <tr key={vehicle.vehicle_id}>
                                    <td>{vehicle.vehicle_id}</td>
                                    <td>{vehicle.number_plate}</td>
                                    <td>{vehicle.make}</td>
                                    <td>{vehicle.model}</td>
                                    <td>{vehicle.year}</td>
                                    <td>{vehicle.status}</td>
                                    <td>{vehicle.type}</td>
                                    <td>
                                        <button className="edit-button" onClick={() => openEditModal(vehicle)}>Edit</button>
                                        <button className="delete-button" onClick={() => handleDelete(vehicle.vehicle_id)}>Delete</button>
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
