import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Comments from "../components/Comments";
import person from "../images/person.svg";
import "./DetailsTest.scss";
import Carousel from "../components/Carousel";

export default function Details() {
	const { id } = useParams();
	const [itemData, setItemData] = useState({});
	const [ownerData, setOwnerData] = useState({});
	const [commentsArray, setCommentsArray] = useState([]);

	useEffect(() => {
		fetchItemData();
	}, []);

	useEffect(() => {
		setCommentsArray(itemData.comments);
		fetchUserData();
	}, [itemData]);

	async function fetchItemData() {
		const response = await fetch(`http://localhost:5000/listings/${id}`);
		const data = await response.json();
		console.log(data);
		setItemData(data);
	}

	async function fetchUserData() {
		const response = await fetch(`http://localhost:5000/members/${itemData.owner_id}`);
		const data = await response.json();
		setOwnerData(data);
	}

	useEffect(() => {
		console.log(ownerData);
	}, [ownerData]);

	return (
		<div className="Details page">
			<div className="main">
				<div className="content-container">
					{/* <div className="page-title">{pageTitle}</div> */}
					<div className="section-container">
						{itemData.vehicle && (
							<div className="details-wrapper">
								<div className="image-wrapper">
									<Carousel itemData={itemData} />
								</div>
								<div className="heading-price">
									<h1>{itemData.title}</h1>
									<h1 className="price">${itemData.price}</h1>
								</div>
								<div className="dis-name">
									<img src={person} />
									<p>{ownerData.display_name}</p>
								</div>{" "}
								<div className="chip-specs">
									<p>Make: {itemData.vehicle.make}</p>
									<p>Model: {itemData.vehicle.model}</p>
									<p>Year: {itemData.vehicle.year}</p>

									<p>Body: {itemData.vehicle.body_type}</p>
									<p>Mileage: {itemData.vehicle.mileage} kms</p>
									<p>Transmission: {itemData.vehicle.transmission}</p>
									<p>Fuel: {itemData.vehicle.fuel_type}</p>
									<p>Seats: {itemData.vehicle.seats}</p>
								</div>
								<p className="description">{itemData.description}</p>
								<div className="buttons">
									<button className="button primary req-button">Request a viewing</button>
									<button className="button secondary buy-button">Buy now</button>
								</div>
							</div>
						)}
						<h1 className="qa-head">Questions & answers</h1>
						<Comments fetchItemData={fetchItemData} itemId={itemData._id} commentsArray={commentsArray} />
					</div>
				</div>
			</div>
		</div>
	);
}
