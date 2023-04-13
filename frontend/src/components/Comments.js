import { useEffect, useState } from "react";
import axios from "axios";

import "./Comments.scss";

axios.defaults.baseURL = "http://localhost:5000/";

const Comments = ({ commentsArray, itemId, fetchItemData }) => {
	console.log(itemId);

	const [commentBody, setCommentBody] = useState("");
	const [reqBody, setReqBody] = useState({});
	const [commentsData, setCommentsData] = useState([]);
	useEffect(() => {
		insertDateAndId();
	}, []);
	function insertDateAndId() {
		const ownerId = JSON.parse(window.localStorage.getItem("active_user"))._id;
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

	function clear(e) {
		e.target.value = "";
	}
	async function formSubmit() {
		axios
			.put(`/listings/${itemId}/comments`, {
				owner_id: reqBody.owner_id,
				post_date: reqBody.post_date,
				body: commentBody,
			})
			.then((res) => {
				console.log("SUBMITTED");
				fetchComments();
			})
			.catch((err) => console.log(err));
	}

	useEffect(() => {
		itemId && fetchComments();
	}, [itemId]);

	async function fetchComments() {
		console.log(itemId);
		const response = await fetch(`http://localhost:5000/listings/${itemId}/comments`);

		const data = await response.json();

		setCommentsData(data.comments);
	}

	useEffect(() => {
		console.log(commentsData);
	}, [commentsData]);

	return (
		<div className="comments-wrapper">
			{commentsData &&
				commentsData.map((item) => {
					return (
						<p className="comment">
							<p className="body">{item.body}</p>
							<footer>
								<p className="date">{item.post_date}</p>
								<p className="name">{item.owner_id.display_name}</p>
							</footer>
						</p>
					);
				})}
			<div>
				<form className="type-comment" onSubmit={handleSubmit}>
					<input onChange={handleCommentChange} onSubmit={clear} placeholder="Type here..."></input>
					<button className="button message-submit secondary" type="submit">
						Send
					</button>
				</form>
			</div>
		</div>
	);
};

export default Comments;
