import "./Account.scss";
import { useEffect, useState } from "react";
import ratingImg from "../images/star.svg";

export default function Account() {
	const pageTitle = "My account";
	const activeUserId = JSON.parse(window.localStorage.getItem("active_user"))._id;
	const [userData, setUserData] = useState([]);
	const [userListings, setUserListings] = useState([]);
	const [userRating, setUserRating] = useState([]);
	const [userBookmarks, setUserBookmarks] = useState([]);

	useEffect(() => {
		fetchUserData();
		fetchUserListings();
		fetchUserBookmarks();
	}, []);

	useEffect(() => {
		setUserRating(userData.ratings && getRatingAverage(userData.ratings));
	}, [userData]);

	useEffect(() => {
		console.log(userBookmarks);
	}, [userBookmarks]);

	async function fetchUserData() {
		const response = await fetch(`http://localhost:5000/members/${activeUserId}`);
		const data = await response.json();
		setUserData(data);
	}

	async function fetchUserListings() {
		const response = await fetch(`http://localhost:5000/members/${activeUserId}/listings`);
		const data = await response.json();
		setUserListings(data.listings);
	}

	async function fetchUserBookmarks() {
		const response = await fetch(`http://localhost:5000/members/${activeUserId}/bookmarks`);
		const data = await response.json();
		setUserBookmarks(data.bookmarks);
	}

	function getRatingAverage(ratingsArray) {
		let total = 0;
		for (let item of ratingsArray) {
			total += item.rating;
		}
		return parseFloat(total / ratingsArray.length).toFixed(1);
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
							<p>{userData.display_name || "Loading"}</p>
							<p className="key">Username</p>
							<p>{userData.username || "Loading"}</p>
							<p className="key">Password</p>
							<p>Update password</p>
							<p className="key">Rating</p>
							<p className="rating">
								{(userRating && userRating) || "Unrated"}
								<img src={ratingImg} />
							</p>
						</div>
					</section>

					<section className="my-listings">
						<h3 className="section-title">{`My listings (${(userListings && userListings.length) || "0"})`}</h3>
						<div className="listings-container">
							{userListings &&
								userListings.map((item) => {
									return (
										<div key={item._id} className="listing-item">
											<div>
												<h3>
													{item.vehicle.make} {item.vehicle.model} {item.vehicle.year}
												</h3>
												<p>${item.price}</p>
											</div>

											<div>
												<p>{item.post_date}</p>
											</div>
										</div>
									);
								})}
						</div>
						<button className="create-listing button primary">Create new listing</button>
					</section>

					<section className="bookmarks">
						<h3 className="section-title">{`Saved bookmarks (${(userBookmarks && userBookmarks.length) || "0"})`}</h3>
						<div className="listings-container">
							{userBookmarks &&
								userBookmarks.map((item) => {
									return (
										<div key={item._id} className="listing-item">
											{/* <h3>{item.title}</h3> */}
											<div>
												<h3>
													{item.vehicle.make} {item.vehicle.model} {item.vehicle.year}
												</h3>
												<p>${item.price}</p>
											</div>

											<div>
												<p>{item.post_date}</p>
												<p>{item.location}</p>
											</div>
										</div>
									);
								})}
						</div>
					</section>
				</div>
			</div>
		</div>
	);
}
