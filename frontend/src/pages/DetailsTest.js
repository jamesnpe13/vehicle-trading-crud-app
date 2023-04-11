import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Comments from "../components/Comments";
import PageLocation from "../components/PageLocation";

export default function Details() {
    const pageTitle = "details page";

    const { id } = useParams();
    const [itemData, setItemData] = useState({});

    const [commentsArray, setCommentsArray] = useState([]);
    useEffect(() => {
        fetchItemData();
    }, []);
    useEffect(() => {
        setCommentsArray(itemData.comments);
    }, [itemData]);
    async function fetchItemData() {
        const response = await fetch(`http://localhost:5000/listings/${id}`);
        const data = await response.json();
        console.log(data);
        setItemData(data);
    }
    return (
        <div>
            <div className="main">
                <div className="content-container">
                    <div className="page-title">{pageTitle}</div>
                    <div className="section-container">
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
