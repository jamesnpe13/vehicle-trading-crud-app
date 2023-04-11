import "./Home.scss";
import ListingCard from "../components/ListCard";
import Loading from "../components/Loading";
import { useEffect, useState } from "react";
import PageLocation from "../components/PageLocation";
import Search from "../components/Search";
export default function Home() {
	const pageTitle = "Browse listings";
	const [listingsData, setListingsData] = useState(undefined);

	async function fetchData() {
		const response = await fetch("http://localhost:5000/listings");
		const data = await response.json();
		setListingsData(data);
	}

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<div className="HomePage page">
			<div className="sidebar">
				<Search />
			</div>

			<div className="main">
				<div className="content-container">
					<div className="page-title">{<PageLocation pageTitle={pageTitle} />}</div>
					<div className="section-container">
						{listingsData &&
							listingsData.map((item) => {
								return <ListingCard key={item._id} itemData={item} />;
							})}
					</div>
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
