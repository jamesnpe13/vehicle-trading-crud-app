// libraries
import "./App.scss";
import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

// components
import Navbar from "./components/Navbar";

// page router
import PageRouter from "./Router";

export const SignedInContext = React.createContext();

export default function App() {
	const navigate = useNavigate();
	const [signedIn, setSignedIn] = useState(false);

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
			redirectToHome();
		} else {
			setSignedIn(false);
		}
	}

	function redirectToHome() {
		console.log("redirecting to home");
		navigate("/listings");
	}

	return (
		<div className="App">
			<SignedInContext.Provider value={[signedIn, setSignedIn]}>
				<Navbar />
				<PageRouter />
			</SignedInContext.Provider>
		</div>
	);
}
