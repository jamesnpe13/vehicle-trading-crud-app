import "./Navbar.scss";
import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import logo from "../images/logo.png";
import hamburger from "../images/hamburger.png";
import * as AiIcons from "react-icons/ai";
import { IconContext} from "react-icons"


const Navbar = () => {
    const path = useLocation().pathname;
    const [currentPage, setCurrentPage] = useState("");

    useEffect(() => {
        console.log(path);
        if (path === "/") {
           setCurrentPage("Signin");
        }
        if (path === "/listings") {
           setCurrentPage("Home");
        }
        if (path === "/listings/create") {
           setCurrentPage("CreateList");
        }
        if (path === "/myListings") {
            setCurrentPage("MyListing ");
         }
        if (path === "/search") {
           setCurrentPage("Search");
        }
     }, [path]);

    //  const toggleNavItems = () => {
    //     setShowNav(showNav ? false : true);
    //     console.log(showNav);
    //     };

    const [sidebar, setSidebar] = useState(false)
    const showSidebar = () => setSidebar(!sidebar)
        
    return (
        <div className="navbar">
            <img className="logo" src={logo} alt="logo"></img>
             <div className="links-desktop">
             <p>My Listings</p>
            <p>Account</p>
            <p>Sign Out</p>
            <p>Customer Support</p>
            </div>
            {/* <p className="location-text disabled">{currentPage}</p> */}
            <IconContext.Provider value={{ color:'#f3f5f9'}}>
            <Link to='/'><img onClick={showSidebar}className="hamburger disabled" src={hamburger} alt="hamburger"></img></Link>
            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                <ul className="nav-menu-items" onClick={showSidebar}>
                    <li className="navbar-toggle">
                        <Link to='/' className='menu-bars'>
                            <AiIcons.AiOutlineClose />
                        </Link>
                    </li>
                   
                            <li className={'nav-text-b'}>
                                <Link to={'/listings'}>
                                    Home
                                </Link>
                            </li>
                            <div className="links-group-1">
                            <li className={'nav-text-b'}>
                                <Link to={'/mylistings'}>
                                    My Listings
                                </Link>
                            </li>
                            <li className={'nav-text'}>
                                <Link to={'/listings'}>
                                    View all listings
                                </Link>
                            </li>
                            <li className={'nav-text'}>
                                <Link to={'/listings/create'}>
                                    Create listing
                                </Link>
                            </li>
                            </div>

                            <div className="links-group-2">
                            <li className={'nav-text-b'}>
                                <Link to={'/account'}>
                                    Account
                                </Link>
                            </li>
                            <li className={'nav-text'}>
                                <Link to={'/accountsetting'}>
                                    Account settings
                                </Link>
                            </li>
                            <li className={'nav-text'}>
                                <Link to={'/transaction'}>
                                    Transaction history
                                </Link>
                            </li>
                            <li className={'nav-text'}>
                                <Link to={'/carddetails'}>
                                    Card details
                                </Link>
                            </li>
                            </div>
                            <div className="links-group-3">
                            <li className={'nav-text-b'}>
                                <Link to={'/customer'}>
                                    Customer service
                                </Link>
                            </li>
                            </div>
                            <div className="links-group-4">
                            <li className={'nav-text-b'}>
                                <Link to={'/signout'}>
                                    Sign out
                                </Link>
                            </li>
                            </div>
                        {/* ) */}
                    {/* })} */}
                </ul>
            </nav>
            </IconContext.Provider>
        </div>
    );
};

export default Navbar;