import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Register.css';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        email: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const url = process.env.REACT_APP_ENDPOINT+'api/user/register'; 

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            toast.error('Passwords do not match!');
            return;
        }

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: formData.username,
                    password: formData.password,
                    first_name: formData.firstName,
                    last_name: formData.lastName,
                    email: formData.email
                }),
            });

            if (response.status !== 201) {
                const errorData = await response.json();
                toast.error('Registration failed: ' + errorData.message);
                return;
            }

            const data = await response.json();
            toast.success('Registration successful!');
            navigate('/');
        } catch (error) {
            toast.error('Registration failed!');
        }
    };

    return (
        <div className="register-container">
            <form onSubmit={handleSubmit} className="register-form">
                <h2>Register</h2>
                <div className="form-grid">
                    <div className="form-group">
                        <label>Username:</label>
                        <input type="text" name="username" value={formData.username} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Password:</label>
                        <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Confirm Password:</label>
                        <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>First Name:</label>
                        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Last Name:</label>
                        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
                    </div>
                    <div className="form-group full-width">
                        <label>Email:</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                    </div>
                </div>
                <button type="submit" className="register-button">Register</button>
            </form>
        </div>
    );
};

export default Register;
