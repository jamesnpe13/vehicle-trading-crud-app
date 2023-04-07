import "./Home.scss";
import Card from "../components/ListCard";
import { useEffect, useState } from "react";
export default function Home() {
	const [listingsData, setListingsData] = useState([]);

	async function fetchData() {
		const response = await fetch("http://localhost:5000/listings");
		const data = await response.json();
		setListingsData(data);
	}

	useEffect(() => {
		fetchData();
	}, []);

	useEffect(() => {
		console.log(listingsData);
	}, [listingsData]);

	return (
		<div className="HomePage page">
			<div className="sidebar"></div>

			<div className="main">
				<div className="content-container">
					{listingsData &&
						listingsData.map((item) => {
							return <Card key={item._id} itemData={item} />;
						})}
				</div>
			</div>
		</div>
	);
}

{
	/* <div className="chips-container">
	<Chip chipsData={chipsData}>Make</Chip>
	<Chip chipsData={chipsData}>Year</Chip>
	<Chip chipsData={chipsData}>Body</Chip>
	<Chip chipsData={chipsData}>Transmission</Chip>
	<Chip chipsData={chipsData}>Color</Chip>
</div>; */
}
