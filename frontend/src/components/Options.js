import { useState, useEffect } from "react";
import "./Options.scss";
import axios from "axios";
import optionsImg from "../images/options.svg";

export default function Options({ listingOwned }) {
	const [dropdownIsActive, setDropdownIsActive] = useState(false);
	const toggleDropdown = () => setDropdownIsActive(!dropdownIsActive);

	// useEffect(() => {
	// 	window.addEventListener("click", (e) => {
	// 		const isContained = e.target.closest(".Options") ? true : false;

	// 		if (!isContained) {
	// 			setDropdownIsActive(false);
	// 		}
	// 	});
	// }, [dropdownIsActive]);

	const optionTypes = {
		owner: () => {
			return (
				<>
					<p className="option">Edit</p>
					<p className="option">Delete</p>
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

	return (
		<div className="Options">
			<button onClick={toggleDropdown}>
				<img src={optionsImg} />
			</button>
			<div className={`dropdown ${dropdownIsActive ? "" : "collapsed"}`}>{listingOwned ? optionTypes.owner() : optionTypes.notOwner()}</div>
		</div>
	);
}
