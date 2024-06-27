import React from 'react'
import SideBar from '../components/sideBar'
import './Dashboard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTruck,faTruckPickup,faVanShuttle } from '@fortawesome/free-solid-svg-icons'

const Dashboard = () => {
  return (
    <div>
      <SideBar/>
      <div style={{
        position: 'absolute',
        left: 180,
        top: 50,
      }}>
      <h1>Your fleet at a glance</h1>
      <div class="table-container" >
      <table>
        <thead> 
        <th> Vehicles </th>
        <th> Total</th>
        <th> Inactive</th>

        </thead>
        <tbody>
        <tr>
        <td> <FontAwesomeIcon icon={faTruck} size='xl' style={{ marginRight:20 }} color='navy' /> Trucks</td>
        <td> 10</td>
        <td> 1</td>
        </tr>
        <tr>
        <td> <FontAwesomeIcon icon={faTruckPickup} style={{ marginRight:20 }} color='green' size='xl'/> Pick-Up</td>
        <td> 5</td>
        <td> 0</td>
        </tr>
        <tr>
        <td> <FontAwesomeIcon icon={faVanShuttle} style={{ marginRight:20 }} color='orange' size='xl'/> Vans</td>
        <td> 3</td>
        <td> 0</td>
        </tr>
        </tbody>
      </table>
      </div>
    </div>
    </div>
  )
}

export default Dashboard