import React from 'react'
import SideBar from '../components/sideBar'
import './Dashboard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTruck,faTruckPickup,faVanShuttle,faDollarSign,faClipboardCheck, faTriangleExclamation, faChartLine } from '@fortawesome/free-solid-svg-icons'
import TruckSideImg from '../Assets/TruckSide.jpg'
import Map from '../components/Map'
const Dashboard = () => {
  const isProfit = false
  return (
    <div>
      <SideBar/>
      <div style={{
        position: 'absolute',
        left: 130,
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
      <div className='table-container' >
      <table>
        <thead>
        <th> Drivers </th>
        <th> Total</th>
        <th> Available</th>
        </thead>
        <tbody>
        <tr>
        <td> <FontAwesomeIcon icon={faTruck} size='xl' style={{ marginRight:20 }} color='navy' /> Drivers</td>
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
        <p >Profit or Loss</p>
        <FontAwesomeIcon icon={{faDollarSign}} size='xl' color='black'/>
       <h2 style={{color: isProfit ? 'green' : 'red'}}> $1000</h2>
      </div>
      <div style={{
        marginLeft: 15,
        display: 'flex',
        flexDirection: 'column',
      }}>
        <img src={TruckSideImg} style={{width: '70%', height: 'auto'}}/>
        <div style={{display:'flex',
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
      
      }}>
        <div style={{
          display:'flex',
          flexDirection:'row'
        }}>
        <FontAwesomeIcon icon={faClipboardCheck} size='xl' color='green'style={{marginRight:10}}/><p>On time 101</p>
        <FontAwesomeIcon icon={faTriangleExclamation} size='xl' color='red' style={{marginLeft:20,marginRight:10}}/><p>Delayed 10</p>
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
        <h4>Live Tracking</h4>
        <img src='https://www.w3schools.com/w3images/avatar3.png' style={{
          width:'40%', borderRadius:'50%',
        }}/>
        <p>Driver Name</p>
        </div>
        <div style={{
          width:'40%',
          
          border:'2px solid black',
          justifyContent:'center',
          alignItems:'center'
        }}>
          <Map/>
        </div>
    </div>
    </div>
    </div>
  )
}

export default Dashboard