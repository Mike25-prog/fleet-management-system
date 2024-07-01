import React, { useEffect, useState } from 'react';
import Header from '../components/top';
import SideBar from '../components/sideBar';

const Vehicles = () => {
    const url = 'http://localhost:5000/api/vehicles';
    const [vehicles, setVehicles] = useState([]);

    useEffect(() => {
        fetch(url, { method: 'GET',})
            .then(res => res.json())
            .then(data => setVehicles(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div>
            <SideBar />
            <div
                style={{
                    position: 'absolute',
                    left: 130,
                    top: 50,
                    width: '100%',
                }}
            >
                <table>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>number plate</th>
                            <th>make</th>
                            <th>model</th>
                            <th>year</th>
                            <th>status</th>
                            <th>image</th>
                            <th>type</th>
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
                                <td><img src={vehicle.image} alt={vehicle.model} width="100" /></td>
                                <td>{vehicle.type}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Vehicles;
