import React from 'react'
import './header.css'
import Nav from '../Nav/nav.js'
import { Link } from 'react-router-dom'


const Header = () => {
  return (
    <header>
        <Link to="/" >
          <h1 className="logo">kit</h1>
        </Link>
        <Nav/>
         
    </header>
  )
}

export default Header