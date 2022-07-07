import React from 'react'
import './header.css'
import Nav from '../Nav/nav.js'
// import { Link } from 'react-router-dom'
import Auth from '../../utils/auth'
import logo from '../../assets/images/lt_logo_caps.png'

const Header = () => {
  return (
    <header>
        {/* <Link to="/" >
          <h1 className="logo">kit</h1>
        </Link> */}

       <img src={logo} className='logoImg' alt='kit'/>
        { Auth.loggedIn() &&
        <div className='logoutContainer'> 
         <Nav/>
            <button onClick={() => Auth.logout()} className="logoutButton">
             Logout
            </button>
        </div>}
         
    </header>
  )
}

export default Header