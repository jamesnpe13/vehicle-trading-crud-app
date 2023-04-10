import "./CreateListing.scss";
import { useEffect, useState } from "react";
import axios from "axios";

export default function CreateListing() {
	const pageTitle = "Create a new listing";
	const [reqBody, setReqBody] = useState({ vehicle: { registration: {}, wof: {} } });

	useEffect(() => {
		insertDateAndId();
	}, []);

	function insertDateAndId() {
		const ownerId = JSON.parse(window.localStorage.getItem("active_user"))._id;
		const newDate = new Date();
		const year = "" + newDate.getFullYear();
		const month = () => {
			const val = "" + (newDate.getMonth() + 1);
			if (val.length < 2) {
				return "0" + val;
			}

			return val;
		};

		const day = () => {
			const val = "" + newDate.getDate();
			if (val.length < 2) {
				return "0" + val;
			}

			return val;
		};

		let thisDate = `${year}/${month()}/${day()}`;

		setReqBody({ ...reqBody, post_date: thisDate, owner_id: ownerId });
	}

	function handleFormChange(e) {
		const subLevel = e.target.getAttribute("data-sub");
		const inputKey = e.target.getAttribute("data-key");
		const inputValue = e.target.value;
		let reqBodyDupe;

		// main
		if (!subLevel) {
			reqBodyDupe = { ...reqBody, [inputKey]: inputValue };
		}

		// vehicle
		if (subLevel === "vehicle") {
			const vehicleSub = { ...reqBody.vehicle, [inputKey]: inputValue };
			reqBodyDupe = { ...reqBody, [subLevel]: vehicleSub };
		}

		// registration
		if (subLevel === "registration") {
			reqBodyDupe = { ...reqBody };
			reqBodyDupe.vehicle.registration[inputKey] = inputValue;
		}

		// wof
		if (subLevel === "wof") {
			reqBodyDupe = { ...reqBody };
			reqBodyDupe.vehicle.wof[inputKey] = inputValue;
		}

		setReqBody(reqBodyDupe);
	}

	useEffect(() => {
		console.log(reqBody);
	}, [reqBody]);

	function handlePriceFocus(e) {
		const num = [...e.target.value];
		const newNum = num.splice(1, num.length).join("");
		e.target.value = newNum;
	}

	function handlePriceChange(e) {
		if (e.target.value.length > 0) {
			e.target.value = `$${e.target.value}`;
		}
	}

	function handleFormSubmit(e) {
		e.preventDefault();
		console.log("sending form");
		sendRequest();
	}

	async function sendRequest() {
		axios
			.post("http://localhost:5000/listings", reqBody)
			.then((res) => console.log(res))
			.catch((err) => console.log(err));
		// const response = await fetch("http://localhost:5000/listings", {
		// 	body: reqBody,
		// 	method: "POST",
		// });
		// const data = await response.json();
		// console.log(data);
	}

	return (
		<div className="CreateListing page">
			{/* <div className="sidebar"></div> */}
			<div className="main">
				<div className="content-container">
					<div className="page-title">{pageTitle}</div>
					<form onSubmit={handleFormSubmit}>
						<div className="section-container">
							<section>
								<div className="carousel"></div>
							</section>

							<section>
								<input type="text" className="title" onChange={handleFormChange} data-key="title" placeholder="Title" required />

								<input type="text" className="price" onChange={handleFormChange} data-key="price" onFocus={handlePriceFocus} onBlur={handlePriceChange} placeholder="Price" required />

								<input type="text" onChange={handleFormChange} data-key="make" data-sub="vehicle" placeholder="Make" />

								<input type="text" onChange={handleFormChange} data-key="model" data-sub="vehicle" placeholder="Model" />

								<input type="text" onChange={handleFormChange} data-key="year" data-sub="vehicle" placeholder="Year" />

								<input type="text" onChange={handleFormChange} data-key="mileage" data-sub="vehicle" placeholder="Mileage" />

								<input type="text" onChange={handleFormChange} data-key="location" placeholder="Location" />

								<textarea className="description" onChange={handleFormChange} data-key="description" placeholder="Description" required />
							</section>

							<section>
								<div className="property">
									<select onChange={handleFormChange} data-sub="registration" data-key="valid">
										<option value="">Registration</option>
										<option value="true">Registered</option>
										<option value="false">Unregistered</option>
									</select>
									<input type="date" onChange={handleFormChange} data-sub="registration" data-key="expiration" />
								</div>

								<div className="property">
									<select onChange={handleFormChange} data-sub="wof" data-key="valid">
										<option value="">WOF</option>
										<option value="true">Valid</option>
										<option value="false">Invalid</option>
									</select>
									<input type="date" onChange={handleFormChange} data-sub="wof" data-key="expiration" />
								</div>

								<div className="property">
									<select onChange={handleFormChange} data-sub="vehicle" data-key="transmission">
										<option value="">Transmission</option>
										<option value="automatic">Automatic</option>
										<option value="manual">Manual</option>
										<option value="tiptronic">Tiptronic</option>
									</select>
								</div>

								<div className="property">
									<select onChange={handleFormChange} data-sub="vehicle" data-key="fuel_type">
										<option value="">Fuel type</option>
										<option value="petrol">Petrol</option>
										<option value="diesel">Diesel</option>
										<option value="electric">Electric</option>
									</select>
								</div>

								<div className="property">
									<select onChange={handleFormChange} data-sub="vehicle" data-key="body_type">
										<option value="">Body type</option>
										<option value="sedan">Sedan</option>
										<option value="hatchback">Hatchback</option>
										<option value="station wagon">Station wagon</option>
										<option value="minivan">Minivan</option>
										<option value="van">van</option>
										<option value="ute">Ute</option>
									</select>
								</div>

								<div className="property">
									<select onChange={handleFormChange} data-sub="vehicle" data-key="seats">
										<option value="">Seats</option>
										<option value="2">2</option>
										<option value="4">4</option>
										<option value="5">5</option>
										<option value="7">7</option>
										<option value="8">8+</option>
									</select>
								</div>
							</section>
						</div>

						<button type="submit">SUBMIT</button>
					</form>
				</div>
			</div>
		</div>
	);
}
