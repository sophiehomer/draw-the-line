import { Link } from 'react-router-dom'
import './nav.css'
import { QUERY_ME_BASIC } from '../../utils/queries'
import { useQuery } from '@apollo/client'



function Nav() {
 const { data } = useQuery(QUERY_ME_BASIC)
 const userId = data?.me._id || ''
 return (
  <>
    <nav>
        <Link to="/" className="navLink">
            HOME
        </Link>
        <Link to={`/profile/${userId}`} className="navLink">
            MY PROFILE
        </Link>
        <Link to="/search-people" className="navLink">
            SEARCH
        </Link>
    </nav>
 

  </>
 )
}

export default Nav
