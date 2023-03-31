import "./Navbar.scss";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import logo from "../images/logo.png";
import hamburger from "../images/hamburger.png";

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
        

    return (
        <div className="navbar">
            <img className="logo" src={logo} alt="logo"></img>
            <p>{currentPage}</p>
            <img className="hamburger" src={hamburger} alt="hamburger"></img>
        </div>
    );
};

export default Navbar;