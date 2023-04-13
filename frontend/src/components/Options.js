import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Options.scss";
import optionsImg from "../images/options.svg";

export default function Options({ listingOwned, listingId, optionsButtonRef }) {
	const navigate = useNavigate();
	const [dropdownIsActive, setDropdownIsActive] = useState(false);
	const toggleDropdown = () => setDropdownIsActive(!dropdownIsActive);
	// const ref = useRef(null);

	const handleDelete = () => {
		deleteListing();
	};

	const deleteListing = async () => {
		await fetch(`http://localhost:5000/listings/${listingId}`, {
			method: "DELETE",
		})
			.then((res) => {
				console.log(res);
				window.location.reload();
			})
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
					<p className="option" data-path={`/account`} onClick={addBookmark}>
						Bookmark
					</p>
				</>
			);
		},
	};

	function handleOptionSelect(e) {
		navigate(e.target.getAttribute("data-path"));
	}

	async function addBookmark(e) {
		const userId = JSON.parse(window.localStorage.getItem("active_user"))._id;

		axios
			.put(`http://localhost:5000/members/${userId}/bookmarks`, { listing_id: listingId })
			.then((res) => {
				console.log(res);
				handleOptionSelect(e);
			})
			.catch((err) => console.log(err));
	}

	useEffect(() => {
		let handler = (e) => {
			if (!optionsButtonRef.current.contains(e.target)) {
				setDropdownIsActive(false);
			}
		};

		document.addEventListener("mousedown", handler);

		return () => {
			document.removeEventListener("mousedown", handler);
		};
	});

	return (
		<div ref={optionsButtonRef} className="Options">
			<button onClick={toggleDropdown}>
				<img src={optionsImg} />
			</button>
			<div className={`dropdown ${dropdownIsActive ? "" : "collapsed"}`}>{listingOwned ? optionTypes.owner() : optionTypes.notOwner()}</div>
		</div>
	);
}
