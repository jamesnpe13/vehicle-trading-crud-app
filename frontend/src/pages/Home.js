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
        listingsData &&
        listingsData.map((item) => {
            return <Card key={item._id} itemData={item} />;
        })
    );
}
