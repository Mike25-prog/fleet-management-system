import { faTruck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const Header = () => {
  return (
    <header>
        <FontAwesomeIcon icon={faTruck} color='blue' size='2x'/>
    </header>
      )
}

export default Header