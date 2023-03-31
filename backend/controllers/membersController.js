// models
const Member = require("../models/member");

// get all members
exports.getAllMembers = async (req, res) => {
	try {
		const result = await Member.find({});
		res.json(result);
	} catch (error) {
		res.send(error);
	}
};

// get a member
exports.getMemberById = async (req, res) => {
	try {
		const result = await Member.findById(req.params.id);
		res.json(result);
	} catch (error) {
		res.send(error);
	}
};

// get member by username - sign in authentication
exports.getMemberByUsername = async (req, res) => {
	try {
		const result = await Member.find({ username: req.params.username });
		if (result.length > 0) {
			res.json(result[0]);
		} else {
			res.send("no match found");
		}
	} catch (error) {
		res.send(error);
	}
};

// make a new rating
exports.makeNewRating = async (req, res) => {
	const newRating = {
		rating: req.body.rating,
		memberId: req.body.user_id,
	};
	const targetMember = await Member.findById(req.params.id);
	const ratingsArray = targetMember.ratings.concat(newRating);
	targetMember.ratings = ratingsArray;
	await targetMember.save();
	res.json(ratingsArray);
};

// get a user's ratings
exports.getRatingById = async (req, res) => {
	const targetUser = await Member.findById(req.params.id);
	const ratingsArray = targetUser.ratings;

	res.json(ratingsArray);
};

// get a members average rating - example code
exports.getAverageRating = async (req, res) => {
	const targetUser = await Member.findById(req.params.id);
	const ratingsArray = targetUser.ratings;
	let sum = 0;
	let averageRating;

	ratingsArray.forEach((item) => {
		sum += item.rating;
	});

	averageRating = parseFloat((sum / ratingsArray.length).toFixed(1));

	res.json({
		average: averageRating,
		all_ratings: ratingsArray,
	});
};

// get a members listing bookmarks
exports.getMemberBookmarks = async (req, res) => {
	const bookmarksArray = await Member.findById(req.params.id).select("bookmarks").populate("bookmarks");

	res.json(bookmarksArray);
};

// add a listing bookmark
exports.createBookmark = async (req, res) => {
	const targetUser = await Member.findById(req.params.id);

	targetUser.bookmarks = [...targetUser.bookmarks, req.body.listing_id];

	await targetUser.save();

	res.json(targetUser);
};

// edit user
exports.editMember = async (req, res) => {
	const findUser = await Member.findById(req.params.id);
	const userOutput = findUser.overwrite(req.body);
	userOutput.save();

	res.json(userOutput);
};

// create a new member
exports.createNewMember = async (req, res) => {
	try {
		const newMember = await Member.create({
			username: req.body.username,
			password: req.body.password,
			display_name: req.body.display_name,
		});
		res.json(newMember);
	} catch (error) {
		res.send(error);
	}
};

// get member's listings
exports.getMemberListings = async (req, res) => {
	const listingsArray = await Member.findById(req.params.id).select("listings").populate("listings");

	res.json(listingsArray);
};
