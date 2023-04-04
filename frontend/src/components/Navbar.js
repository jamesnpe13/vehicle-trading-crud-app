import "./Navbar.scss";
import { useLocation, Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import logo from "../images/logo.png";
import hamburger from "../images/hamburger.png";
import * as AiIcons from "react-icons/ai";
import { SignedInContext } from "../App";

const Navbar = () => {
	const path = useLocation().pathname;
	const [currentPage, setCurrentPage] = useState("");
	const [sidebar, setSidebar] = useState(false);
	const [signedIn, setSignedIn] = useContext(SignedInContext);
	const navigate = useNavigate();

	const displayNameInitials = () => {
		const activeUserDisplayName = JSON.parse(window.localStorage.getItem("active_user")).display_name;
		const words = activeUserDisplayName.split(" ");
		const firstLetters = words.map((item) => {
			return item.charAt(0);
		});
		const firstLettersJoined = firstLetters.join("");
		return firstLettersJoined;
	};

	const showSidebar = () => setSidebar(!sidebar);

	function handleSignOut() {
		setSignedIn(false);
		window.localStorage.removeItem("active_user");
	}

	return (
		<div className="navbar">
			<img className="logo" src={logo} alt="logo" onClick={() => navigate("/listings")} />

			{signedIn && (
				<div className="links-desktop">
					<Link to={"/listings"}>
						<p>Browse</p>
					</Link>
					<Link to={"/account"}>
						<p>Bookmarks</p>
					</Link>
					<Link to={"/account"}>
						<p>My Listings</p>
					</Link>
					<Link to={"/"} onClick={handleSignOut}>
						<p>Sign out</p>
					</Link>

					<div className="display-name-container">
						<p>{signedIn ? displayNameInitials() : ""}</p>
					</div>
				</div>
			)}

			{signedIn && (
				<React.Fragment>
					<img onClick={showSidebar} className="hamburger disabled" src={hamburger} />

					<nav className={sidebar ? "nav-menu active" : "nav-menu"} onClick={showSidebar}>
						<div className="close-button">
							<AiIcons.AiOutlineClose />
						</div>

						<ul className="links-group">
							<li className={"nav-text-b"}>
								<Link to={"/listings"}>Home</Link>
							</li>
						</ul>

						<ul className="links-group">
							<li className={"nav-text-b"}>
								<Link to={"/mylistings"}>My Listings</Link>
							</li>
							<li className={"nav-text"}>
								<Link to={"/listings"}>View all listings</Link>
							</li>
							<li className={"nav-text"}>
								<Link to={"/listings/create"}>Create listing</Link>
							</li>
						</ul>

						<ul className="links-group">
							<li className={"nav-text-b"}>
								<Link to={"/account"}>Account</Link>
							</li>
							<li className={"nav-text"}>
								<Link to={"/accountsetting"}>Account settings</Link>
							</li>
							<li className={"nav-text"}>
								<Link to={"/transaction"}>Transaction history</Link>
							</li>
							<li className={"nav-text"}>
								<Link to={"/listings/:id/payment"}>Card details</Link>
							</li>
						</ul>
						<ul className="links-group">
							<li className={"nav-text-b"}>
								<Link to={"/customer"}>Customer service</Link>
							</li>
						</ul>
						<ul className="links-group signout">
							<li className={"nav-text-b"}>
								<Link to={"/"} onClick={handleSignOut}>
									Sign out
								</Link>
							</li>
						</ul>
					</nav>
				</React.Fragment>
			)}
		</div>
	);
};

export default Navbar;

// return (
// 	<div className="navbar">
// 		<img
// 			className="logo"
// 			src={logo}
// 			alt="logo"
// 			onClick={() => {
// 				navigate("/listings");
// 			}}
// 		/>
// 		<div className="links-desktop">
// 			<Link to={"/mylistings"}>
// 				<p>My Listings</p>
// 			</Link>
// 			<Link to={"/account"}>
// 				<p>Account</p>
// 			</Link>
// 			<Link to={"/"} onClick={handleSignOut}>
// 				<p>Sign Out</p>
// 			</Link>
// 			<Link to={"/customer"}>
// 				<p className="last">Customer Support</p>
// 			</Link>
// 		</div>

// 		<IconContext.Provider value={{ color: "#f3f5f9" }}>
// 			<img onClick={showSidebar} className="hamburger disabled" src={hamburger}></img>

// 			<nav className={sidebar ? "nav-menu active" : "nav-menu"}>
// 				<ul className="nav-menu-items" onClick={showSidebar}>
// 					<div className="close-button">
// 						<AiIcons.AiOutlineClose />
// 					</div>

// 					<div className="links-group">
// 						<li className={"nav-text-b"}>
// 							<Link to={"/listings"}>Home</Link>
// 						</li>
// 					</div>

// 					<div className="links-group">
// 						<li className={"nav-text-b"}>
// 							<Link to={"/mylistings"}>My Listings</Link>
// 						</li>
// 						<li className={"nav-text"}>
// 							<Link to={"/listings"}>View all listings</Link>
// 						</li>
// 						<li className={"nav-text"}>
// 							<Link to={"/listings/create"}>Create listing</Link>
// 						</li>
// 					</div>

// 					<div className="links-group">
// 						<li className={"nav-text-b"}>
// 							<Link to={"/account"}>Account</Link>
// 						</li>
// 						<li className={"nav-text"}>
// 							<Link to={"/accountsetting"}>Account settings</Link>
// 						</li>
// 						<li className={"nav-text"}>
// 							<Link to={"/transaction"}>Transaction history</Link>
// 						</li>
// 						<li className={"nav-text"}>
// 							<Link to={"/carddetails"}>Card details</Link>
// 						</li>
// 					</div>
// 					<div className="links-group">
// 						<li className={"nav-text-b"}>
// 							<Link to={"/customer"}>Customer service</Link>
// 						</li>
// 					</div>
// 					<div className="links-group">
// 						<li className={"nav-text-b"}>
// 							<Link to={"/"} onClick={handleSignOut}>
// 								Sign out
// 							</Link>
// 						</li>
// 					</div>
// 					{/* ) */}
// 					{/* })} */}
// 				</ul>
// 			</nav>
// 		</IconContext.Provider>
// 	</div>
// );
