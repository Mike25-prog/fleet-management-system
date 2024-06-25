import React from 'react'
import Home from './Pages/Home'
import AddVehicle from './components/AddVehicle'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

const App = () => {
  return (
    <div>
    <AddVehicle />
    </div>
  )
}

export default App