import "./ListCard.scss";
import locationimg from "../images/location.svg";
import carimg from "../images/car.svg";
import fuelimg from "../images/fuel.svg";
import odometerimg from "../images/odometer.svg";
import personimg from "../images/person.svg";
import transmissionimg from "../images/transmission.svg";
import { useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

const Card = ({ itemData }) => {
	return (
		<div className="card">
			<Splide
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
			</Splide>

			<div className="card-info">
				<h2 className="list-title">{itemData.title}</h2>
				<div className="specs">
					<div className="main-specs prop-panel">
						<p className="price">$10,000</p>
						<div className="item-property">
							<img src={personimg}></img>
							<p>{itemData.owner_id.display_name}</p>
						</div>
						<div className="item-property">
							<img src={locationimg}></img>
							<p>{itemData.location}</p>
						</div>
					</div>
					{/* <hr /> */}
					<div className="detail-specs prop-panel">
						<div className="item-property">
							<img src={carimg}></img>
							<p>
								{itemData.vehicle.make} {itemData.vehicle.model}
							</p>
						</div>
						<div className="item-property">
							<img src={personimg}></img>
							<p>{itemData.vehicle.year}</p>
						</div>
						<div className="item-property">
							<img src={odometerimg}></img>
							<p>{itemData.vehicle.mileage}</p>
						</div>
						<div className="item-property">
							<img src={fuelimg}></img>
							<p>{itemData.vehicle.color}</p>
						</div>
						<div className="item-property">
							<img src={transmissionimg}></img>
							<p>{itemData.vehicle.transmission}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Card;
