import React from 'react'
import Dashboard from './Pages/Dashboard'
import AddVehicle from './components/AddVehicle'
import { UserProvider } from './context/userContext'
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Login from './Pages/Login';
import Register from './Pages/Register';
const App = () => {
  return (

  <BrowserRouter>
  <UserProvider>
    
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/add-vehicle' element={<AddVehicle/>}/>
    </Routes>

    </UserProvider>
  </BrowserRouter>

    
  )
}

export default App