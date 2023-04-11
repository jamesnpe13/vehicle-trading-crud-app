import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Comments from "../components/Comments";
import graphic1 from "../images/graphic1.svg";
import "./DetailsTest.scss";

import PageLocation from "../components/PageLocation";

export default function Details() {
    const pageTitle = "details page";

    const { id } = useParams();
    const [itemData, setItemData] = useState({});
    const [ownerData, setOwnerData] = useState({});
    const [commentsArray, setCommentsArray] = useState([]);

    useEffect(() => {
        fetchItemData();
    }, []);

    useEffect(() => {
        setCommentsArray(itemData.comments);
        fetchUserData();
    }, [itemData]);

    async function fetchItemData() {
        const response = await fetch(`http://localhost:5000/listings/${id}`);
        const data = await response.json();
        console.log(data);
        setItemData(data);
    }

    async function fetchUserData() {
        const response = await fetch(
            `http://localhost:5000/members/${itemData.owner_id}`
        );
        const data = await response.json();
        setOwnerData(data);
    }

    useEffect(() => {
        console.log(ownerData);
    }, [ownerData]);

    return (
        <div className="Details page">
            <div className="main">
                <div className="content-container">
                    {/* <div className="page-title">{pageTitle}</div> */}
                    <div className="section-container">
                        {itemData.length > 0 && (
                            <div className="details-wrapper">
                                <img src={graphic1} />
                                <h1>{itemData.title}</h1>
                                <h1>${itemData.price}</h1>
                                <h3>{ownerData.display_name}</h3>
                                <div className="chip-specs">
                                    <p>Make: {itemData.vehicle.make}</p>
                                    <p>Model: {itemData.vehicle.model}</p>
                                    <p>Body: {itemData.vehicle.body_type}</p>

                                    <p>Year: {itemData.vehicle.year}</p>
                                    <p>Mileage: {itemData.vehicle.mileage}</p>
                                    <p>Model: {itemData.vehicle.model}</p>
                                    <p>
                                        Transmission:{" "}
                                        {itemData.vehicle.transmission}
                                    </p>
                                    <p>Fuel: {itemData.vehicle.fuel_type}</p>
                                    <p>Seats: {itemData.vehicle.seats}</p>
                                </div>
                                <p>{itemData.description}</p>
                                <button className="req-button">
                                    Request a viewing
                                </button>
                                <button className="buy-button">Buy now</button>
                            </div>
                        )}
                        <Comments
                            fetchItemData={fetchItemData}
                            itemId={itemData._id}
                            commentsArray={commentsArray}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
