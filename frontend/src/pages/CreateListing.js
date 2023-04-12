import "./CreateListing.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Toast from "../components/Toast"

const msgList = {
	complete: "Successfully created!",
	updated: "Successfully updated!",
	error: "Failed"
  };

export default function CreateListing({ editMode }) {
	const navigate = useNavigate();
	const pageTitle = editMode ? "Edit listing" : "Create a new listing";
	const [imagesArray, setImagesArray] = useState(null);
	const [reqBody, setReqBody] = useState({ vehicle: { registration: {}, wof: {} } });
	const [listingData, setListingData] = useState(null);
	const [render, setRender] = useState(false);

	const [ToastStatus, setToastStatus] = useState(false);
	const [ToastMsg, setToastMsg] = useState("");
  
	const handleToast = (type) => {
	  if (!ToastStatus) {
		setToastStatus(true);
		setToastMsg(msgList[type]);
	  }
	};
  
	useEffect(() => {
	  if (ToastStatus) {
		setTimeout(() => {
		  setToastStatus(false);
		  setToastMsg("");
		}, 1000);
	  }
	}, [ToastStatus]);

	const { id } = useParams();

	useEffect(() => {
		console.log(imagesArray);
	}, [imagesArray]);

	useEffect(() => {
		if (!editMode) {
			insertDateAndId();
			setRender(true);
		}
		if (editMode) {
			fetchListingData();
		}
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

	function handleImageChange(e) {
		setImagesArray(e.target.files);
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
		let formData = new FormData();

		const bodyStringified = JSON.stringify(reqBody);
		formData.append("content", bodyStringified);
		
		if (!editMode) {
			for (let image of imagesArray) {
				formData.append("files", image);
			}
		}

		if (editMode) {
			sendRequest(reqBody);
		} else {
			sendRequest(formData);
		}
	}

	async function sendRequest(formData) {
		if (!editMode) {
			axios
				.post("http://localhost:5000/listings", formData)
				.then((res) => {
					console.log(res);
					onSuccess();
				})
				.catch((err) => {
					console.log(err);
					onError();
				});
		}

		if (editMode) {
			axios
				.put(`http://localhost:5000/listings/${id}`, formData)
				.then((res) => {
					console.log(res.data);
					onSuccess();
				})
				.catch((err) => {
					console.log(err);
					onError();
				});
		}
	}

	
	function onSuccess() {
		editMode ? handleToast("updated"): handleToast("complete");
		setTimeout(()=>{
			navigate("/account");
		} ,2000)
		
	}

	function onError() {
		editMode ? handleToast("error"): handleToast("complete");

	
	}

	
 
	

	// ========== edit mode

	async function fetchListingData() {
		const response = await fetch(`http://localhost:5000/listings/${id}`);
		const data = await response.json();
		setListingData(data);
	}

	useEffect(() => {
		editMode && setReqBody(listingData);
	}, [listingData]);

	useEffect(() => {
		listingData && console.log(listingData.vehicle.registration.valid);
		listingData && setRender(true);
	}, [listingData]);

	return (
		<div className="CreateListing page">
			{/* <div className="sidebar"></div> */}
			<div className="main">
				<div className="content-container">
					<div className="page-title">{pageTitle}</div>
					{render && (
						<form onSubmit={handleFormSubmit}>
							<div className="section-container">
								<section>
									{!editMode && <input type="file" name="files" id="files" onChange={handleImageChange} accept=".jpg, .png" required />}
									<div className="carousel"></div>
								</section>
								<div className="flex-container">
									<section>
										<input type="text" className="title" onChange={handleFormChange} data-key="title" placeholder="Title" defaultValue={editMode && listingData && listingData.title} required/>

										<input
											type="text"
											className="price"
											onChange={handleFormChange}
											data-key="price"
											defaultValue={editMode && listingData && `$${listingData.price}`}
											onFocus={handlePriceFocus}
											onBlur={handlePriceChange}
											placeholder="Price"
											required
										/>

										<input type="text" onChange={handleFormChange} data-key="make" data-sub="vehicle" placeholder="Make" defaultValue={editMode && listingData && listingData.vehicle.make} />

										<input type="text" onChange={handleFormChange} data-key="model" data-sub="vehicle" placeholder="Model" defaultValue={editMode && listingData && listingData.vehicle.model} />

										<input type="text" onChange={handleFormChange} data-key="year" data-sub="vehicle" placeholder="Year" defaultValue={editMode && listingData && listingData.vehicle.year} />

										<input type="text" onChange={handleFormChange} data-key="mileage" data-sub="vehicle" placeholder="Mileage" defaultValue={editMode && listingData && listingData.vehicle.mileage} />

										<input type="text" onChange={handleFormChange} data-key="location" placeholder="Location" defaultValue={editMode && listingData && listingData.location} />

										<textarea className="description" onChange={handleFormChange} data-key="description" placeholder="Description" defaultValue={editMode && listingData && listingData.description} required />
									</section>

									<section>
										<div className="property">
											<select onChange={handleFormChange} data-sub="registration" data-key="valid" defaultValue={editMode && listingData && listingData.vehicle.registration.valid}>
												<option value="">Registration</option>
												<option value="true">Registered</option>
												<option value="false">Unregistered</option>
											</select>
											<input type="date" onChange={handleFormChange} data-sub="registration" data-key="expiration" defaultValue={editMode && listingData && listingData.vehicle.registration.expiration} />
										</div>

										<div className="property">
											<select onChange={handleFormChange} data-sub="wof" data-key="valid" defaultValue={editMode && listingData && listingData.vehicle.wof.valid}>
												<option value="">WOF</option>
												<option value="true">Valid WOF</option>
												<option value="false">Invalid WOF</option>
											</select>
											<input type="date" onChange={handleFormChange} data-sub="wof" data-key="expiration" defaultValue={editMode && listingData && listingData.vehicle.registration.expiration} />
										</div>

										<div className="property">
											<select onChange={handleFormChange} data-sub="vehicle" data-key="transmission" defaultValue={editMode && listingData && listingData.vehicle.transmission}>
												<option value="">Transmission</option>
												<option value="automatic">Automatic</option>
												<option value="manual">Manual</option>
												<option value="tiptronic">Tiptronic</option>
											</select>
										</div>

										<div className="property">
											<select onChange={handleFormChange} data-sub="vehicle" data-key="fuel_type" defaultValue={editMode && listingData && listingData.vehicle.fuel_type}>
												<option value="">Fuel type</option>
												<option value="petrol">Petrol</option>
												<option value="diesel">Diesel</option>
												<option value="electric">Electric</option>
											</select>
										</div>

										<div className="property">
											<select onChange={handleFormChange} data-sub="vehicle" data-key="body_type" defaultValue={editMode && listingData && listingData.vehicle.body_type}>
												<option value="">Body type</option>
												<option value="sedan">Sedan</option>
												<option value="hatchback">Hatchback</option>
												<option value="hatchback">SUV</option>
												<option value="station wagon">Station wagon</option>
												<option value="minivan">Minivan</option>
												<option value="van">van</option>
												<option value="ute">Ute</option>
											</select>
										</div>

										<div className="property">
											<select onChange={handleFormChange} data-sub="vehicle" data-key="seats" defaultValue={editMode && listingData && listingData.vehicle.seats}>
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
								<button type="submit" className="button span primary" >
									{editMode ? "Update listing" : "Submit listing"}
								</button>
								{ToastStatus && (<>
          							<Toast msg={ToastMsg} /></> )}
							</div>
						</form>
					)}
				</div>
			</div>
		</div>
	);
}
