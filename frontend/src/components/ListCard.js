import "./ListCard.scss";
import locationimg from "../images/location.svg";
import carimg from "../images/car.svg";
import odometerimg from "../images/odometer.svg";
import transmissionimg from "../images/transmission.svg";
import React, { useEffect, useState, useRef } from "react";
import "@splidejs/react-splide/css";
import placeholderImg from "../images/graphic2.svg";
import { useNavigate } from "react-router-dom";
import Options from "./Options";

const Card = ({ itemData }) => {
	const navigate = useNavigate();
	const optionsButtonRef = useRef(null);
	const cardRef = useRef(null);
	const [listingOwned, setListingOwned] = useState(false);

	const thumbnailImage = itemData.images.length > 0 ? `http://localhost:5000/images/${itemData.images[0]}` : placeholderImg;

	useEffect(() => {
		checkListingOwned();
	}, []);

	function checkListingOwned() {
		const userId = JSON.parse(window.localStorage.getItem("active_user"))._id;

		if (itemData.owner_id._id) {
			if (itemData.owner_id._id === userId) {
				setListingOwned(true);
				return;
			}
		} else {
			if (userId === itemData.owner_id) {
				setListingOwned(true);
				return;
			}
		}
	}

	useEffect(() => {
		let handler = (e) => {
			if (cardRef.current.contains(e.target)) {
				if (!optionsButtonRef.current.contains(e.target)) {
					console.log("outside");
					handleCardClick();
				}
			}
		};

		document.addEventListener("mousedown", handler);

		return () => {
			document.removeEventListener("mousedown", handler);
		};
	});

	function handleCardClick() {
		navigate(`/listings/${itemData._id}`);
	}

	return (
		<div ref={cardRef} className="card">
			<img src={thumbnailImage} alt="" className="thumbnail" />

			<div className="info-container">
				<h3 className="title">{itemData.title}</h3>
				<p className="make-model-year">
					{itemData.vehicle.make} {itemData.vehicle.model} {itemData.vehicle.year}
				</p>
				<p className="mileage property">
					<img src={odometerimg} />
					{itemData.vehicle.mileage}kms
				</p>

				<div className="extension">
					<p className="transmission property">
						<img src={transmissionimg} />
						{itemData.vehicle.transmission}
					</p>
					<p className="body-type property">
						<img src={carimg} />
						{itemData.vehicle.body_type}
					</p>
				</div>
				{listingOwned ? <p className="seller">You own this listing</p> : <p className="seller">{itemData.owner_id.display_name}</p>}
				{!listingOwned && (
					<div className="location property">
						<img src={locationimg} />
						<p>{itemData.location}</p>
					</div>
				)}
				<p className="price">${itemData.price}</p>
			</div>

			<Options listingOwned={listingOwned} listingId={itemData._id} optionsButtonRef={optionsButtonRef} />
		</div>
	);
};

export default Card;
