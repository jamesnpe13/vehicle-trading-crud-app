import { useEffect, useState } from "react";
import "./Search.scss";

export default function Search() {
	const [searchInput, setSearchInput] = useState("");

	useEffect(() => {
		console.log(searchInput);
	}, [searchInput]);

	function handleSearchInputChange(e) {
		setSearchInput(e.target.value);
	}

	function handleSearchSubmit(e) {
		e.preventDefault();
	}

	return (
		<div className="Search">
			<form onSubmit={handleSearchSubmit}>
				<input type="text" onChange={handleSearchInputChange} placeholder="Keywords" className="span" />
				<button type="submit" className="button primary span">
					Search
				</button>
			</form>
		</div>
	);
}
