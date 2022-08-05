import React from 'react'
import './footer.css'
import { AiFillInstagram } from 'react-icons/ai';
import { AiOutlineTwitter } from 'react-icons/ai';
import { FaTiktok } from 'react-icons/fa'
// import logo from '../../assets/images/darkLogo.png'

const Footer = () => {
  return (
      <footer>
        <div className="footerContent">
        <div className="contactContainer">
              <a href='mailto:keepintouchsocial2022@gmail.com' className='contact'>CONTACT</a>
          </div>

          <p className='copyright'>
            KIT 2022 &copy;
          </p>

          <div className="socialContainer">
            <a href='https://www.instagram.com/kitsocial2022/' className='instagramIcon'><AiFillInstagram size={20}/></a>
            <a href='https://twitter.com/kitsocial2022' className='twitterIcon'><AiOutlineTwitter size={20}/></a>
            <a href='https://www.tiktok.com/en/' className='tiktokIcon'><FaTiktok size={20}/></a>
          </div>
        
            
        </div>

        {/* <p className='copyright'>
          KIT 2022 &copy;
        </p>   */}
      </footer>
  )
}

export default Footer