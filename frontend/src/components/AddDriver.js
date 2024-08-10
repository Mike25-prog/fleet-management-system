import React, { useState } from 'react';
import './AddForm.css';
import ComboBox from 'react-responsive-combo-box';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const AddDriver = () => {
    const options = [
        'Active',
        'Inactive',
    ];

    const [driverData, setDriverData] = useState({
        first_name: '',
        last_name: '',
        license_number: '',
        license_expiry_date: '',
        contact_number: '',
        email: '',
        status: '',
    });

    const handleSubmit = (event) => {
        event.preventDefault();

        const url = 'http://4.221.79.76:5000/api/drivers/';

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(driverData)
        })
            .then(response => response.json())
            .then(data => {
                // Handle the response data here
                console.log(data);
            })
            .then(() => {
                toast.success('Driver added successfully', {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            })
            .then(() => {
                setDriverData({
                    first_name: '',
                    last_name: '',
                    license_number: '',
                    license_expiry_date: '',
                    contact_number: '',
                    email: '',
                    status: '',
                });
            })
            .catch(error => {
                // Handle any errors that occur during the request
                console.error(error);
            });
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setDriverData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    return (
        <div className="container">
            <div className="form-container">
                <div className="form-section">
                    <h2>Add Driver</h2>
                    <form className="add-form" onSubmit={handleSubmit}>
                        <label className="add-label">
                            First Name:
                            <input className="add-input" required type="text" name="first_name" value={driverData.first_name} onChange={handleChange} />
                        </label>
                        <label className="add-label">
                            Last Name:
                            <input className="add-input" required type="text" name="last_name" value={driverData.last_name} onChange={handleChange} />
                        </label>
                        <label className="add-label">
                            License Number:
                            <input className="add-input" required type="text" name="license_number" value={driverData.license_number} onChange={handleChange} />
                        </label>
                        <label className="add-label">
                            License Expiry Date:
                            <input className="add-input" required type="date" name="license_expiry_date" value={driverData.license_expiry_date} onChange={handleChange} />
                        </label>
                        <label className="add-label">
                            Contact Number:
                            <input className="add-input" required type="text" name="contact_number" value={driverData.contact_number} onChange={handleChange} />
                        </label>
                        <label className="add-label">
                            Email:
                            <input className="add-input" required type="email" name="email" value={driverData.email} onChange={handleChange} />
                        </label>
                        <label className="add-label">
                            Status:
                            </label>
                            <ComboBox
                                options={options}
                                placeholder='Select driver status'
                                onSelect={(option) => {
                                    setDriverData({
                                        ...driverData,
                                        status: option
                                    });
                                }}/>
                        <button className="add-button" type="submit">Add Driver</button>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default AddDriver;
