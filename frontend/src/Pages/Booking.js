import React, { useEffect, useState } from 'react';
import SideBar from '../components/sideBar';
import AddBooking from '../components/AddBooking';
import EditVehicle from '../components/EditVehicle';
import './Vehicles.css';

const Booking = () => {
   
    return (
        <div>
            <SideBar />
            <div style={{
        position: 'absolute',
        left: 130,
        top: 50,
        width: '90%',
        
      }}>
              <AddBooking/> 
        </div>
      </div>
    );
}

export default Booking;
