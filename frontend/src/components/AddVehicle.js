import React, { useState, useContext } from 'react';
import './AddForm.css';
import ComboBox from 'react-responsive-combo-box';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const AddVehicle = () => {
    const options = [
        'Truck',
        'Pick-Up',
        'Vans',
    ]
    const [vehicleData, setVehicleData] = useState({
        number_plate: '',
        make: '',
        model: '',
        year: 0,
        status: '',
        image: '',
        type:''
    });
 const [preview, setPreview] = useState('');
 const [imageData, setImageData] = useState(null);
 const handleImageChange = (event) => {
        setImageData(event.target.files[0]);
        setPreview(URL.createObjectURL(event.target.files[0]));
        vehicleData.image = URL.createObjectURL(event.target.files[0]);
 }
    const handleSubmit = (event) => {
        event.preventDefault();

        const url = 'http://localhost:5000/api/vehicles/';

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(vehicleData)
        })
            .then(response => response.json())
            .then(data => {
                // Handle the response data here
                console.log(data);
            })
            .then(() => {
                toast.success('Vehicle added successfully', {
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
                setVehicleData({
                    number_plate: '',
                    make: '',
                    model: '',
                    year: 0,
                    status: '',
                    image: ''
                });
            })
            .catch(error => {
                // Handle any errors that occur during the request
                console.error(error);
            });
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setVehicleData(prevData => ({
            ...prevData,
            [name]: value,
            image:preview

        }));
    };

    return (
        <div className="container">
            <div className="form-container">
                <div className="form-section">
                    <h2>Add Vehicle</h2>
                    <form className="add-form" onSubmit={handleSubmit}>
                        <label className="add-label">
                            Number Plate:
                            <input className="add-input" required type="text" name="number_plate" value={vehicleData.number_plate} onChange={handleChange} />
                        </label>
                        <label className="add-label">
                            Make:
                            <input className="add-input" required type="text" name="make" value={vehicleData.make} onChange={handleChange} />
                        </label>
                        <label className="add-label">Model:
                            <input className="add-input" required type="text" name="model" value={vehicleData.model} onChange={handleChange} />
                        </label>
                        <label className="add-label">
                            Year:
                            <input className="add-input" required type="number" name="year" value={vehicleData.year} onChange={handleChange} />
                        </label>
                        <label className="add-label">
                            Status:
                            <input className="add-input" required type="text" name="status" value={vehicleData.status} onChange={handleChange} />
                        </label>
                        <label className="add-label">
                            Type:
                            </label>
                            <ComboBox
                                options={options}
                                placeholder='Select vehicle type'
                                onSelect={(option) => {
                                    setVehicleData({
                                        ...vehicleData,
                                        type: option
                                    });
                                }}/>
                        <button className="add-button" type="submit">Add Vehicle</button>
                        
                    </form>
                </div>
                <div className="form-section">
                    <form>
                        <label>Preview</label>
                        <img src={preview} alt="Preview" style={{ width: 300, height: 300 }} />
                        <label>
                            Image:
                            <input type="file" name="image" onChange={handleImageChange} placeholder='add image'/>
                        </label>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddVehicle;
