import { Link, useNavigate } from "react-router-dom";
import React, { useState, useContext } from "react";
import * as AiIcons from "react-icons/ai";

import logo from "../images/logo.png";
import hamburger from "../images/hamburger.png";
import { SignedInContext } from "../App";
import "./Navbar.scss";

const Navbar = () => {
	const [sidebar, setSidebar] = useState(false);
	const [signedIn, setSignedIn] = useContext(SignedInContext);
	const navigate = useNavigate();

	const navLinks = {
		browse: () => {
			return <Link to={"/listings"}>Browse</Link>;
		},
		createListing: () => {
			return <Link to={"/account/listings/create"}>Create Listing</Link>;
		},
		myListings: () => {
			return <Link to={"/account/listings"}>My listings</Link>;
		},
		bookmarks: () => {
			return <Link to={"/account/bookmarks"}>Bookmarks</Link>;
		},
		account: () => {
			return <Link to={"/account"}>Account</Link>;
		},
		signout: () => {
			return (
				<Link to={"/"} onClick={handleSignOut}>
					Sign out
				</Link>
			);
		},
		activeUser: () => {
			return (
				<div className="display-name-container">
					<p>{signedIn ? displayNameFull() : ""}</p>
				</div>
			);
		},
	};

	const displayNameInitials = () => {
		const activeUserDisplayName = JSON.parse(window.localStorage.getItem("active_user")).display_name;
		const words = activeUserDisplayName.split(" ");
		const firstLetters = words.map((item) => {
			return item.charAt(0);
		});
		const firstLettersJoined = firstLetters.join("");
		return firstLettersJoined;
	};

	const displayNameFull = () => {
		const activeUserDisplayName = JSON.parse(window.localStorage.getItem("active_user")).display_name;

		return activeUserDisplayName;
	};

	const showSidebar = () => setSidebar(!sidebar);

	function handleSignOut() {
		setSignedIn(false);
		window.localStorage.removeItem("active_user");
	}

	return (
		signedIn && (
			<div className="navbar">
				<img className="logo" src={logo} alt="logo" onClick={() => navigate("/listings")} />

				{signedIn && (
					<div className="links-desktop">
						{navLinks.browse()}
						{navLinks.createListing()}
						{navLinks.account()}
						{navLinks.signout()}
						{navLinks.activeUser()}
					</div>
				)}

				{signedIn && (
					<React.Fragment>
						<img onClick={showSidebar} className="hamburger disabled" src={hamburger} />

						<nav className={sidebar ? "nav-menu active" : "nav-menu"} onClick={showSidebar}>
							<div className="close-button">
								<AiIcons.AiOutlineClose />
							</div>
							{navLinks.activeUser()}
							<ul className="links-group">
								<li className={"nav-text-b"}>{navLinks.browse()}</li>
								<li className={"nav-text-b"}>{navLinks.createListing()}</li>
							</ul>

							<ul className="links-group">
								<li className={"nav-text-b"}>{navLinks.account()}</li>
								<li className="nav-text-b">{navLinks.signout()}</li>
							</ul>
						</nav>
					</React.Fragment>
				)}
			</div>
		)
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
