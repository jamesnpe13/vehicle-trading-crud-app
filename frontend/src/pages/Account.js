import "./Account.scss";
import { useEffect, useState } from "react";

export default function Account() {
	const pageTitle = "My account";
	const activeUserId = JSON.parse(window.localStorage.getItem("active_user"))._id;
	const [userData, setUserData] = useState([]);

	useEffect(() => {
		fetchUserData();
	}, []);

	async function fetchUserData() {
		const response = await fetch(`http://localhost:5000/members/${activeUserId}`);
		const data = await response.json();
		setUserData(data);
	}

	return (
		<div className="Account page">
			{/* <div className="sidebar"></div> */}

			<div className="main">
				<div className="content-container">
					<div className="page-title">{pageTitle}</div>

					<section className="account-details">
						<h3 className="section-title">Account details</h3>
						<div className="grid-wrapper">
							<p className="key">Display name</p>
							<p>{userData.display_name}</p>
							<p className="key">Username</p>
							<p>{userData.username}</p>
							<p className="key">Password</p>
							<p>Update password</p>
						</div>
					</section>

					<button className="button primary">Create a listing</button>

					<section className="my-listings">
						<h3 className="section-title">My listings</h3>
					</section>

					<section className="bookmarks">
						<h3 className="section-title">Saved bookmarks</h3>
					</section>
				</div>
			</div>
		</div>
	);
}
