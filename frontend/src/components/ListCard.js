import "./ListCard.scss";
import locationimg from "../images/location.svg";
import carimg from "../images/car.svg";
import fuelimg from "../images/fuel.svg";
import odometerimg from "../images/odometer.svg";
import personimg from "../images/person.svg";
import transmissionimg from "../images/transmission.svg";
import yearimg from "../images/year.svg";
import colorimg from "../images/color.svg";
import React, { useEffect, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import placeholderImg from "../images/graphic1.svg";
import Options from "./Options";

const Card = ({ itemData }) => {
	const [listingOwned, setListingOwned] = useState(false);

	function checkListingOwned() {
		const userId = JSON.parse(window.localStorage.getItem("active_user"))._id;

		if (userId === itemData.owner_id._id) {
			setListingOwned(true);

			return;
		}
	}

	useEffect(() => {
		checkListingOwned();
	}, []);

	// }
	return (
		<div className="card">
			<img src={placeholderImg} alt="" className="thumbnail" />

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
					{!listingOwned && <p className="seller">{itemData.owner_id.display_name}</p>}
				</div>

				{!listingOwned && (
					<div className="location property">
						<img src={locationimg} />
						<p>{itemData.location}</p>
					</div>
				)}
				<p className="price">${itemData.price}</p>
			</div>

			<Options listingOwned={listingOwned} />

			{/* <Splide
				className="splide"
				options={{
					rewind: true,
				}}>
				<SplideSlide>
					<img src="https://www.grouphealth.ca/wp-content/uploads/2018/05/placeholder-image.png" alt="img1"></img>
				</SplideSlide>

				<SplideSlide>
					<img src="https://www.grouphealth.ca/wp-content/uploads/2018/05/placeholder-image.png" alt="img2"></img>
				</SplideSlide>
			</Splide> */}

			{/* <div className="card-info">
				<h2 className="list-title">{itemData.title}</h2>
				<div className="specs">
					<div className="main-specs prop-panel">
						<p className="price">{`$${itemData.price}`}</p>
						<div className="item-property">
							<img src={carimg}></img>
							<p>
								{itemData.vehicle.year} {itemData.vehicle.make} {itemData.vehicle.model}
							</p>
						</div>
						<div className="item-property">
							<img src={personimg}></img>
							<p>{itemData.owner_id.display_name}</p>
						</div>
						<div className="item-property">
							<img src={locationimg}></img>
							<p>{itemData.location}</p>
						</div>
						<p className="description">
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur nobis dolores sunt, et deleniti repellendus ullam sit rem voluptatibus neque maiores, quidem quibusdam suscipit ad voluptatem laborum cum cupiditate quam
							obcaecati, explicabo illum ipsa fugiat sint corrupti. Laboriosam voluptate debitis earum veniam. Harum ducimus, id accusamus repudiandae nesciunt eveniet quam.
						</p>
					</div>

					<div className="detail-specs prop-panel">
						<div className="item-property">
							<img src={odometerimg}></img>
							<p>{itemData.vehicle.mileage} km</p>
						</div>
						<div className="item-property">
							<img src={personimg}></img>
							<p>{"[SEATS]"}</p>
						</div>
						<div className="item-property">
							<img src={fuelimg}></img>
							<p>{"[FUEL TYPE]"}</p>
						</div>
						<div className="item-property">
							<img src={transmissionimg}></img>
							<p>{itemData.vehicle.transmission}</p>
						</div>
					</div>
				</div>
			</div> */}
		</div>
	);
};

export default Card;
