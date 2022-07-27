import React from 'react'
import './header.css'
import Nav from '../Nav/nav.js'
// import { Link } from 'react-router-dom'
import Auth from '../../utils/auth'
import logo from '../../assets/images/logo.png'

const Header = () => {
  return (
    <header>
       <img src={logo} className='logoImg' alt='kit'/>
        { Auth.loggedIn() &&
         <Nav/>
          
        }

        { Auth.loggedIn() && 
          <button onClick={() => Auth.logout()} className="logoutButton">
            Logout
          </button>
        }
         
    </header>
  )
}

export default Header