import React from 'react'
import Dashboard from './Pages/Dashboard'
import AddVehicle from './components/AddVehicle'
import { UserProvider } from './context/userContext'
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Login from './Pages/Login';
import Register from './Pages/Register';
<<<<<<< HEAD
import Vehicles from './Pages/Vehicles';
=======
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Vehicles from './Pages/Vehicles'
>>>>>>> f36a2ce470e9233f9df777f897e1f738f0678ab3
const App = () => {
  return (
  <BrowserRouter>
  <UserProvider>
    
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/add-vehicle' element={<AddVehicle/>}/>
      <Route path='/vehicles' element={<Vehicles/>}/>
<<<<<<< HEAD
=======
      
     
>>>>>>> f36a2ce470e9233f9df777f897e1f738f0678ab3
    </Routes>
    
    </UserProvider>
  </BrowserRouter>


    
  )
}

export default App