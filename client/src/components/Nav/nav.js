import { Link } from 'react-router-dom'
// import { useLocation } from 'react-router'
// import { useState } from 'react'
import './nav.css'
// import { Button, Offcanvas } from 'react-bootstrap'
import { QUERY_ME_BASIC } from '../../utils/queries'
import { useQuery } from '@apollo/client'
import Auth from '../../utils/auth'

function Nav() {
//  const location = useLocation()
//  const selectedTab = location.pathname

//  function activeTab(path) {
//   if (selectedTab !== path) {
//    return
//   } else {
//    return { color: 'silver' }
//   }
//  }

 const { data } = useQuery(QUERY_ME_BASIC)
 const userId = data?.me._id || ''

 return (
  <>
    <nav>

                    <Link to="/" className="tab">
                        Home
                    </Link>
                    <Link to={`/profile/${userId}`}>
                        View my profile
                    </Link>
                    <Link to="/Create-post" className="tab">
                        Write Post
                    </Link>
                    <Link to="/search-people" className="tab">
                        Search Friends
                    </Link>
                    <button onClick={() => Auth.logout()} className="tab">
                        Logout
                    </button>
    </nav>
  </>
 )
}

export default Nav
