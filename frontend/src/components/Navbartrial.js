import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import logo from "../images/logo.png";
import hamburger from "../images/hamburger.png";
import "./Navbartrial.scss";

// const [showNav, setShowNav] = useSate(false)

// const toggleNavItems = () => {
//   setShowNav(!showNav)
// }

const Navbartrial = () => {
    const [showNavbar, setShowNavbar] = useState(false)

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar)
  }

//   const [showNav, setShowNav] = useSate(false)

//     const toggleNavItems = () => {
//     setShowNav(!showNav)
//     }



  return (
    <nav className="navbar">
      <div className="container">
        <img className="logo" src={logo} alt="logo"></img>
        <div className="menu-icon" onClick={handleShowNavbar}>
         <img className="hamburger" src={hamburger} alt="hamburger"></img>
        </div>
        <div className={`nav-elements  ${showNavbar && 'active'}`}></div>
        <div className="nav-elements">
          <ul>
            <li>
              <NavLink to="/myListings">My Listings</NavLink>
            </li>
            <li>
              <NavLink to="/search">Account</NavLink>
            </li>
            <li>
              <NavLink to="/">Sign out</NavLink>
            </li>
            <li>
              <NavLink to="/">Customer Support</NavLink>
            </li>
            <li>
              <NavLink to="/contact">Contact</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbartrial