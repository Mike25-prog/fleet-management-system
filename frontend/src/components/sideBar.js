import React from 'react'
import './sideBar.css'
import{faChartSimple, faCircleRadiation, faLocationCrosshairs,faTruck,faGears, faGear, faTachometerAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Header from './top';
const SideBar = () => {
  return (
    <>
    <Header/>
    <div className="dashboard">
      <aside className="sidebar">
        <Link style={{textDecoration:'none',color:'#228800'}}  to='/dashboard'  >
        <div className="sidebar-item"><FontAwesomeIcon icon={faTachometerAlt } size='lg' /> Dashboard</div>
        </Link>
        <Link style={{textDecoration:'none',color:'#228800'}}  to='/live-tracking'>
        <div className="sidebar-item"><FontAwesomeIcon icon={faLocationCrosshairs} size='lg' />Live Tracking</div>
        </Link>
        <Link style={{textDecoration:'none',color:'#228800'}}  to='/vehicles'>
        <div className="sidebar-item"><FontAwesomeIcon icon={faTruck} size='lg' />Vehicles</div>
        </Link>
        <Link style={{textDecoration:'none',color:'#228800'}}  to='/drivers'>
        <div className="sidebar-item">< FontAwesomeIcon icon={faCircleRadiation} size='lg'  />Drivers</div>
        </Link>
        <Link style={{textDecoration:'none',color:'#228800'}}  to='/maintenance'>
        <div className="sidebar-item"> < FontAwesomeIcon icon={faGears} size='lg'  /> Maintenance</div>
        </Link>
        <Link style={{textDecoration:'none',color:'#228800',} } to='/analytics'>
        <div className="sidebar-item"><FontAwesomeIcon icon={faChartSimple} size='lg'/>   Analytics</div>
        </Link>
        <Link style={{textDecoration:'none',color:'#228800'}}  to='/settings'>
        <div className="settings">< FontAwesomeIcon icon={faGear} size='lg'  />Settings</div>
        </Link>
        <Link style={{textDecoration:'none',color:'#228800'}}  to='/'>
        <div className="log-out">< FontAwesomeIcon icon={faSignOutAlt } size='lg'  />Log out</div>
        </Link>
      </aside>
    </div>
    </>
  )
}

export default SideBar