// libraries
import "./App.scss";
import { useEffect, useState } from "react";

// custom hooks
import {} from "./hooks/vroom";

// components
// import Navbar from "./components/Navbar";
import Navbartrial from "./components/Navbartrial";

// page router
import PageRouter from "./Router";
import Card from "./components/ListCard";

export default function App() {
    const [listingsData, setListingsData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const response = await fetch("http://localhost:5000/listings", {
            method: "GET",
        }).catch((err) => {
            // console.log("ERR: " + err);
        });
        const data = await response.json();
        setListingsData(data);
        console.log(response);
    };

    const listings = listingsData.map((item) => {
        return <p key={item._id}>{item.title}</p>;
    });

    return (
        <div className="App">
            <div>{listingsData.length > 0 ? listings : "loading data"}</div>
            <PageRouter />
        </div>
    );
}
