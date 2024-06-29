import { faTruck,faBell } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React,{useContext} from 'react'
import { UserContext } from '../context/userContext'
import truckImg from '../Assets/TruckIcon.jpg'
const Header = () => {
  const {user} = useContext(UserContext)
  return (
    <header style={{
      width:'100%',
      height:60,
      backgroundColor:'white',
      display:'flex',
      justifyContent:'space-between',
      top:0,
      position:'sticky',
      borderBottom:'2px solid lightgray',
      boxShadow: '0 4px 10px 0 rgba(0,0,0,0.1)',
      zIndex:2

    }}>
        <div style={{
          display:'flex',
          flexDirection:'row',
          marginLeft:60,
          
        }}>
        <img src={truckImg} /><p style={{marginLeft:10,color:'#228800',fontSize:20,fontWeight:'bold'}}>My Fleet</p>
        </div>
        <div style={{
          display:'flex',
          flexDirection:'row',
          justifyContent:'space-between',
        }}>
         {/*notification*/} 
         <FontAwesomeIcon icon={faBell} color='#228800' size='2x' style={{marginRight:20,justifySelf:'center'}}/>
         <p >Name</p>
         {console.log(user)}
        </div>
    </header>
      )
}

export default Header