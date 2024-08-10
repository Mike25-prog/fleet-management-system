import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { UserContext } from '../context/userContext';
import { toast } from 'react-toastify';

const Login = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const url = 'http://4.221.79.76:5000/api/user/login';

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.status === 404) {
                alert('User not found');
                throw new Error('User not found');
            }

            if (response.status === 401) {
                alert('Invalid credentials');
                throw new Error('Invalid credentials');
            }

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log(data);

            toast.success('Login successful!');
            setUser(data);
            navigate('/dashboard'); // Redirect to the dashboard or home page after successful login
        } catch (error) {
            console.error('Login failed:', error);
            toast.error(`Login failed! ${error.message}`);
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <h1>Login</h1>
                <div className="form-group">
                    <label>Username:</label>
                    <input 
                        type="text" 
                        name="username" 
                        value={formData.username} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input 
                        type="password" 
                        name="password" 
                        value={formData.password} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <button type="submit" className="login-button">Login</button>
                <a href="/register" color='#03C2CB' style={{textAlign:'center'}}>Don't have an account? Register here</a>
            </form>
        </div>
    );
};

export default Login;
