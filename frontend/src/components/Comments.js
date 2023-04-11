import { useEffect, useState } from "react";
import "./Comments.scss";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000/";

const Comments = ({ commentsArray, itemId, fetchItemData }) => {
    console.log(commentsArray);
    console.log(itemId);
    const user = JSON.parse(window.localStorage.getItem("active_user"))._id;
    const [commentBody, setCommentBody] = useState("");
    const [reqBody, setReqBody] = useState({});
    useEffect(() => {
        insertDateAndId();
    }, []);
    function insertDateAndId() {
        const ownerId = JSON.parse(
            window.localStorage.getItem("active_user")
        )._id;
        const newDate = new Date();
        const year = "" + newDate.getFullYear();
        const month = () => {
            const val = "" + (newDate.getMonth() + 1);
            if (val.length < 2) {
                return "0" + val;
            }
            return val;
        };
        const day = () => {
            const val = "" + newDate.getDate();
            if (val.length < 2) {
                return "0" + val;
            }
            return val;
        };
        let thisDate = `${year}/${month()}/${day()}`;
        setReqBody({ ...reqBody, post_date: thisDate, owner_id: ownerId });
    }
    function handleCommentChange(e) {
        setCommentBody(e.target.value);
    }
    useEffect(() => {
        console.log(commentBody);
    }, [commentBody]);

    function handleSubmit(e) {
        e.preventDefault();
        formSubmit();
    }
    async function formSubmit() {
        axios
            .put(`/listings/${itemId}/comments`, {
                ownder_id: reqBody.owner_id,
                post_date: reqBody.post_date,
                body: commentBody,
            })
            .then((res) => {
                console.log(res);
                fetchItemData();
            })
            .catch((err) => console.log(err));
    }

    return (
        <div className="comments-wrapper">
            <div>
                {commentsArray &&
                    commentsArray.map((item) => {
                        return <p className="comment">{item.body}</p>;
                    })}
                <div>
                    <form className="type-comment" onSubmit={handleSubmit}>
                        <input
                            onChange={handleCommentChange}
                            placeholder="type here..."
                        ></input>
                        <button type="submit">Send</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Comments;
