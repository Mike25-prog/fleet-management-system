import React from 'react'
import './sideBar.css'
import{faChartSimple, faCircle, faCircleRadiation, faList,faLocationCrosshairs,faTruck,faGears, faGear, faTachometerAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import steering from '../Assets/car_steering.png'
const SideBar = () => {
  return (
    <div className="dashboard">
      <aside className="sidebar">
        <div className="sidebar-item"><FontAwesomeIcon icon={faTachometerAlt } size='lg' /> Dashboard</div>
        <div className="sidebar-item"><FontAwesomeIcon icon={faLocationCrosshairs} size='lg' />Live Tracking</div>
        <div className="sidebar-item"><FontAwesomeIcon icon={faTruck} size='lg' />Vehicles</div>
        <div className="sidebar-item">< FontAwesomeIcon icon={faCircleRadiation} size='lg'  />Drivers</div>
        <div className="sidebar-item"> < FontAwesomeIcon icon={faGears} size='lg'  /> Maintenance</div>
        <div className="sidebar-item"><FontAwesomeIcon icon={faChartSimple} size='lg'/>   Analytics</div>
        <div className="settings">< FontAwesomeIcon icon={faGear} size='lg'  />Settings</div>
        <div className="log-out">< FontAwesomeIcon icon={faSignOutAlt } size='lg'  />Log out</div>
      </aside>
    </div>
  )
}

export default SideBar