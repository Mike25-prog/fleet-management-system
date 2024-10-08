import { faTruck,faBell } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React,{useContext, useEffect, useState} from 'react'
import { UserContext } from '../context/userContext'
import van from '../Assets/van.jpg'
const Header = () => {
  const {user,setUser} = useContext(UserContext)
  const [userName,setUserName] = useState('')
  const storedUser = localStorage.getItem('user')
  useEffect(() => {
    
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser)
      setUser(parsedUser)  // Update the context
      setUserName(parsedUser.user.username)
    } else if (user && user.user) {
      // If user data is in context but not in localStorage, save it
      localStorage.setItem('user', JSON.stringify(user))
      setUserName(user.user.username)
    }
  }, [])
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
          marginLeft:30,
          
        }}>
        <img src={van} /><p style={{marginLeft:10,color:'#228800',fontSize:20,fontWeight:'bold'}}>My Fleet</p>
        </div>
        <div style={{
          display:'flex',
          flexDirection:'row',
          justifyContent:'space-between',
        }}>
         {/*notification*/} 
         <FontAwesomeIcon icon={faBell} color='#228800' size='2x' style={{marginRight:20,justifySelf:'center',marginTop:10}}/>
         <p style={{marginRight:20}}>{userName}</p>
        </div>
    </header>
      )
}

export default Header
