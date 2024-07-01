import React, { useEffect, useState } from 'react';
import Header from '../components/top';
import SideBar from '../components/sideBar';

const Drivers = () => {
    const url = 'http://localhost:5000/api/drivers';
    const [drivers, setDrivers] = useState([]);

    useEffect(() => {
        fetch(url, { method: 'GET',})
            .then(res => res.json())
            .then(data => setDrivers(data))
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
                            <th>driverid</th>
                            <th>contact number</th>
                            <th>email</th>
                            <th>first name</th>
                            <th>last name</th>
                            <th>licence expiry date</th>
                            <th>licence number</th>
                        </tr>
                    </thead>
                    <tbody>
                        {drivers.map((driver) => (
                            <tr key={driver.id}>
                                <td>{driver.id}</td>
                                <td>{driver.number_plate}</td>
                                <td>{driver.make}</td>
                                <td>{driver.model}</td>
                                <td>{driver.year}</td>
                                <td>{driver.status}</td>
                                <td><img src={driver.image} alt={driver.model} width="100" /></td>
                                <td>{driver.type}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Drivers;

