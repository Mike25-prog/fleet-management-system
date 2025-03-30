import React from 'react'
import SideBar from '../components/sideBar'
import './Dashboard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTruck,faTruckPickup,faVanShuttle,faDollarSign,faClipboardCheck, faTriangleExclamation, faChartLine } from '@fortawesome/free-solid-svg-icons'
import van from '../Assets/van.jpg'
import Map from '../components/Map'
const Dashboard = () => {
  const isProfit = false
  return (
    <div>
      <SideBar/>
      <div style={{
        position: 'absolute',
        left: 220,
        top: 50,
        width: '100%',
        
      }}>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        width: '100%',
        margin: 20
      }}>
      <div class="table-container" >
      
      </div>
      <div className='table-container' >
      
      </div>
      <div style={{
        width: '13%',
        marginRight: 20,
             
        border: '1px solid lightgray',
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: 10

      }}>
        
      </div>

      <div style={{
        marginLeft: 15,
        display: 'flex',
        flexDirection: 'column',
      }}>
        
        <div style={{display:'flex',
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
      
      }}>
        <div style={{
          display:'flex',
          flexDirection:'row'
        }}>
        
      </div>
      </div>
      </div>
    </div>
    <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        width: '100%',
        margin: 20
      }}>
        <div style={{
          display:'flex',
          flexDirection:'column'
          
        }}>
        
        </div>
        <div style={{
          width:'40%',
          
          border:'2px solid black',
          justifyContent:'center',
          alignItems:'center'
        }}>
          
        </div>
    </div>
    </div>
    </div>
  )
}

export default Dashboard




import React from 'react'
import SideBar from '../components/sideBar'
import './Dashboard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTruck,faTruckPickup,faVanShuttle,faDollarSign,faClipboardCheck, faTriangleExclamation, faChartLine } from '@fortawesome/free-solid-svg-icons'
import van from '../Assets/van.jpg'
import Map from '../components/Map'
import {useEffect, useState } from "react"
import { useBooking } from "../context/BookingContext"
import TripList from "../components/TripList"



const Dashboard = () => {
  console.log("Dashboard component is rendering...");

  const isProfit = false
  const { setSelectedTrip } = useBooking();
  const [trips, setTrips] = useState([]);


useEffect(() => {
  console.log("Fetching trips..."); // ✅ Debugging
  fetch("http://localhost:5000/api/trips")
      .then(res => res.json())
      .then(data => {
          console.log("Trips received from API:", data); // ✅ Log API response
          setTrips(data);
      })
      .catch(err => console.error("Error fetching trips:", err));
}, []);

return (
  <div className="dashboard">
      <SideBar />
      <div className="main-content">
          <div className="center-section">{/* This ensures balance */}</div>
          <div className="available-trips">
              
          </div>
      </div>
  </div>
);


};

export default Dashboard