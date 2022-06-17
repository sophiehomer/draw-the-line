import React from 'react'
import './header.css'
import Nav from '../Nav/nav.js'


const Header = () => {
  return (
    <header>
        <h1 className="logoFont">soapbox</h1>
        <Nav/>
    </header>
  )
}

export default Header