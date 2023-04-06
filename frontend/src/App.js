// libraries
import "./App.scss";
import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

// components
import Navbar from "./components/Navbar";

// page router
import PageRouter from "./Router";

export const SignedInContext = React.createContext();
export const responsiveContext = React.createContext();

export default function App() {
	const navigate = useNavigate();
	const [signedIn, setSignedIn] = useState(false);
	const [staySignedIn, setStaySignedIn] = useState(true);

	// screen responsiveness
	const [screenMode, setScreenMode] = useState("");
	const [screenWidth, setScreenWidth] = useState(window.innerWidth);
	const breakpoint1 = 1200;
	const breakpoint2 = 700;

	window.addEventListener("resize", () => {
		setScreenWidth(window.innerWidth);
		handleScreenResize();
	});

	function handleScreenResize() {
		if (screenWidth > breakpoint1) setScreenMode("desktop");
		if (screenWidth <= breakpoint1 && screenWidth > breakpoint2) setScreenMode("tablet");
		if (screenWidth <= breakpoint2) setScreenMode("mobile");
	}

	// user signed in check
	useEffect(() => {
		checkActiveUser();
		console.log("USER SIGNED IN: " + signedIn);
	}, [signedIn]);

	function checkActiveUser() {
		// check localStorage
		const userIsActive = window.localStorage.getItem("active_user") ? true : false;

		// if userIsActive
		if (userIsActive) {
			setSignedIn(true);
		} else {
			setSignedIn(false);
		}
	}

	// signout on window close
	window.addEventListener("beforeunload", () => {
		if (!staySignedIn) {
			setSignedIn(false);
			window.localStorage.removeItem("active_user");
		}
	});

	return (
		<div className="App">
			{" "}
			<responsiveContext.Provider value={screenMode}>
				<SignedInContext.Provider value={[signedIn, setSignedIn]}>
					<Navbar />
					<PageRouter />
				</SignedInContext.Provider>
			</responsiveContext.Provider>
		</div>
	);
}
