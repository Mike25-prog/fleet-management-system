import React from 'react';
import Dashboard from './Pages/Dashboard';
import AddVehicle from './components/AddVehicle';
import { UserProvider } from './context/userContext';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Vehicles from './Pages/Vehicles';
import Maintenance from './Pages/Maintenance';
import Trips from './components/Trips';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/add-vehicle' element={<AddVehicle />} />
          <Route path='/vehicles' element={<Vehicles />} />
          <Route path='/maintenance' element={<Maintenance />} />
          <Route path='/trips' element={<Trips />} />
        </Routes>
        <ToastContainer /> {/* Add ToastContainer for notifications */}
      </UserProvider>
    </BrowserRouter>
  );
};

export default App;
