import "./Home.scss";
import ListingCard from "../components/ListCard";
import NoData from "../components/NoData";
import { useEffect, useState } from "react";
import { useNavigate, userNavigate } from "react-router-dom";
import PageLocation from "../components/PageLocation";
import Search from "../components/Search";
import searchGraphic from "../images/searchGraphic.svg";
export default function Home() {
	const pageTitle = "Browse listings";
	const [listingsData, setListingsData] = useState(undefined);
	const navigate = useNavigate();

	async function fetchData() {
		const response = await fetch("http://localhost:5000/listings");
		const data = await response.json();
		setListingsData(data);
	}

	useEffect(() => {
		console.log(listingsData);
	}, [listingsData]);

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
						{listingsData && listingsData.length > 0 ? (
							listingsData.map((item) => {
								return <ListingCard key={item._id} itemData={item} />;
							})
						) : (
							<>
								<NoData />
								<img className="search-graphic" src={searchGraphic} />
								<button
									className="button span primary"
									onClick={() => {
										navigate("/account/listings/create");
									}}>
									Create listing
								</button>
							</>
						)}
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
