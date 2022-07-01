import React from 'react'
import './header.css'
import Nav from '../Nav/nav.js'
// import { Link } from 'react-router-dom'
import Auth from '../../utils/auth'


const Header = () => {
  return (
    <header>
        {/* <Link to="/" >
          <h1 className="logo">kit</h1>
        </Link> */}
        <Nav/>
        <button onClick={() => Auth.logout()} className="logoutButton">
            Logout
          </button>
         
    </header>
  )
}

export default Header