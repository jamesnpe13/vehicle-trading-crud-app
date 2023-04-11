import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Options.scss";
import axios from "axios";
import optionsImg from "../images/options.svg";
import Listcards from "../components/ListCard";

export default function Options({ listingOwned, listingId }) {
	const navigate = useNavigate();
	const [dropdownIsActive, setDropdownIsActive] = useState(false);
	const toggleDropdown = () => setDropdownIsActive(!dropdownIsActive);
	const ref = useRef(null);

	const handleDelete = () => {
		deleteListing();
	};

	const deleteListing = async () => {
		await fetch(`http://localhost:5000/listings/${listingId}`, {
			method: "DELETE",
		})
			.then((res) => console.log(res))
			.catch((err) => console.log(err));
	};

	const optionTypes = {
		owner: () => {
			return (
				<>
					<p className="option" data-path={`/account/listings/${listingId}/edit`} onClick={handleOptionSelect}>
						Edit
					</p>
					<p className="option" onClick={handleDelete}>
						Delete
					</p>
				</>
			);
		},
		notOwner: () => {
			return (
				<>
					<p className="option">Bookmark</p>
				</>
			);
		},
	};

	function handleOptionSelect(e) {
		navigate(e.target.getAttribute("data-path"));
	}

	useEffect(() => {
		let handler = (e) => {
			if (!ref.current.contains(e.target)) {
				setDropdownIsActive(false);
			}
		};

		document.addEventListener("mousedown", handler);

		return () => {
			document.removeEventListener("mousedown", handler);
		};
	});

	return (
		<div ref={ref} className="Options">
			<button onClick={toggleDropdown}>
				<img src={optionsImg} />
			</button>
			<div className={`dropdown ${dropdownIsActive ? "" : "collapsed"}`}>{listingOwned ? optionTypes.owner() : optionTypes.notOwner()}</div>
		</div>
	);
}