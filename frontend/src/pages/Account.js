import "./Account.scss";
import { useEffect, useState } from "react";
import ratingImg from "../images/star.svg";
import ListingCard from "../components/ListCard";

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
		console.log(userListings);
	}, [userListings]);

	useEffect(() => {
		setUserRating(userData.ratings && getRatingAverage(userData.ratings));
	}, [userData]);

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

		if (ratingsArray.length > 0) {
			for (let item of ratingsArray) {
				total += item.rating;
			}
		} else {
			return "Unrated";
		}

		return parseFloat(total / ratingsArray.length).toFixed(1);
	}

	return (
		<div className="Account page">
			{/* <div className="sidebar"></div> */}

			<div className="main">
				<div className="content-container">
					<div className="page-title">{pageTitle}</div>
					<div className="section-container">
						<section className="account-details">
							<h3 className="section-title">Account details</h3>
							<div className="properties-wrapper">
								<div className="property">
									<p className="label">Display name</p>
									<p className="value">{userData.display_name}</p>
								</div>
								<div className="property">
									<p className="label">Username</p>
									<p className="value">{userData.username}</p>
								</div>

								<button className="button primary v2">Change account details</button>

								<div className="property">
									<p className="label">Rating</p>
									<p className="rating">
										{userRating && userRating}
										<img src={ratingImg} />
									</p>
								</div>
							</div>
						</section>

						<section className="my-listings">
							<h3 className="section-title">{`My listings (${(userListings && userListings.length) || "0"})`}</h3>
							<div className="listings-container">
								{userListings &&
									userListings.map((item) => {
										return <ListingCard key={item._id} itemData={item} />;
									})}
							</div>
							<button className="create-listing button primary span">Create new listing</button>
						</section>

						<section className="bookmarks">
							<h3 className="section-title">{`Saved bookmarks (${(userBookmarks && userBookmarks.length) || "0"})`}</h3>
							<div className="listings-container">
								{userBookmarks &&
									userBookmarks.map((item) => {
										return <ListingCard key={item._id} itemData={item} />;
									})}
							</div>
						</section>
					</div>
				</div>
			</div>
		</div>
	);
}
