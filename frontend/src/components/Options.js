import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Options.scss";
import axios from "axios";
import optionsImg from "../images/options.svg";
import Listcards from "../components/ListCard"



export default function Options({ listingOwned, listingId, index }) {
	const navigate = useNavigate();
	const [dropdownIsActive, setDropdownIsActive] = useState(false);
	const toggleDropdown = () => setDropdownIsActive(!dropdownIsActive);
	const ref = useRef(null);

	// const removeList = () => {
	// 	listingId.removeList(index);
	// }

	const removeList = id => {
		toggleDropdown();
		listingOwned(Listcards => Listcards.filter(itemData => listingId !== id));

	}
	

	// const removeList = (index) => {
	// 	setDropdownIsActive(dropdownIsActive.filter((_, _index) => _index != index));
	// }


	const optionTypes = {
		owner: () => {
			return (
				<>
					<p className="option" data-path={`/account/listings/${listingId}/edit`} onClick={handleOptionSelect}>
						Edit
					</p>
					<p className="option" onClick={()=>removeList()}>Delete</p>
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
