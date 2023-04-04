import { useEffect, useState } from "react";
import "./Signin.scss";
import { useNavigate } from "react-router-dom";

export default function Signin() {
	const [userInput, setUserInput] = useState({});
	const navigate = useNavigate();

	// check if user signed in
	useEffect(() => {
		checkActiveUser();
	}, []);

	function checkActiveUser() {
		// check localStorage
		const userIsActive = window.localStorage.getItem("activeUserId") ? true : false;

		// if userIsActive = true, redirect to homepage
		userIsActive && redirectToHome();
	}

	// sign in and authenticate
	function handleChangeUsername(e) {
		setUserInput({ ...userInput, username: e.target.value });
	}

	function handleChangePassword(e) {
		setUserInput({ ...userInput, password: e.target.value });
	}

	function handleSubmit(e) {
		e.preventDefault();
		userAuthenticate();
	}

	async function userAuthenticate() {
		const response = await fetch(`http://localhost:5000/members/signin/${userInput.username}`);
		const data = await response.json();

		// if user does not exist
		if (!data) {
			console.log("Username does not exist");
			return;
		}

		// if user exists check password
		if (userInput.password === data.password) {
			console.log("Access granted");
			saveUserData(data);
			redirectToHome();
			return;
		} else {
			console.log("Password incorrect");
			return;
		}
	}

	function saveUserData(data) {
		const { _id, username, display_name } = data;

		// save to local storage

		window.localStorage.setItem("activeUserId", _id);
		window.localStorage.setItem("activeUserUsername", username);
		window.localStorage.setItem("activeUserDisplayName", display_name);

		// save to global state
	}

	function redirectToHome() {
		console.log("redirecting to home");
		navigate("/listings");
	}

	return (
		<form onSubmit={handleSubmit}>
			<input type="text" placeholder="Username" required={true} onChange={handleChangeUsername} />
			<input type="text" placeholder="Password" required={true} onChange={handleChangePassword} />
			<button type="submit">Sign in</button>
		</form>
	);
}
