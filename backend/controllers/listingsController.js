// models
const Listing = require("../models/listing");
const Member = require("../models/member");

// i dont know what this code is for? who the heck wrote this
// get all listings by a member
// ==========================================
// async (req, res) => {
// 	const result = await Listing.find({ member: req.params.member });

// 	res.json(result);
// };
// ==========================================

// get all listings
exports.getAllListings = async (req, res) => {
	const result = await Listing.find({}).populate("owner_id");

	res.json(result);
};

// get a listing by ID
exports.getListingById = async (req, res) => {
	try {
		const result = await Listing.find({ _id: req.params.id });
		res.json(result);
	} catch (error) {
		console.log(error);
		res.send(error);
	}
};

// create a new listing
exports.createNewListing = async (req, res) => {
	const date = new Date();

	const targetUser = await Member.findById(req.body.owner_id);
	const newListing = await Listing.create({
		owner_id: req.body.owner_id,
		title: req.body.title,
		description: req.body.description,
		location: req.body.location,
		price: req.body.price,
		post_date: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
		vehicle: {
			make: req.body.vehicle.make,
			model: req.body.vehicle.model,
			year: req.body.vehicle.year,
			mileage: req.body.vehicle.mileage,
			transmission: req.body.vehicle.transmission,
			body_type: req.body.vehicle.body_type,
			color: req.body.vehicle.color,
			seats: req.body.vehicle.seats,
			fuel_type: req.body.vehicle.fuel_type,
			registration: {
				valid: req.body.vehicle.registration.valid,
				registration_number: req.body.vehicle.registration.registration_number,
				expiration: req.body.vehicle.registration.expiration,
			},
			wof: {
				valid: req.body.vehicle.wof.valid,
				expiration: req.body.vehicle.wof.expiration,
			},
		},
	}).catch((err) => {
		res.json(err);
	});

	targetUser.listings = [...targetUser.listings, newListing];
	targetUser.save();

	res.json(newListing);
};

// create new comment
exports.createNewComment = async (req, res) => {
	// new array item/object
	const date = new Date();
	const newComment = {
		owner_id: req.body.owner_id,
		body: req.body.body,
		post_date: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
	};

	// target document
	const targetListing = await Listing.findById(req.params.id);

	// existing array concatinated with new array item
	const commentsArray = targetListing.comments.concat(newComment);

	// manual key-value change
	targetListing.comments = commentsArray;

	// save changes
	await targetListing.save();

	// response
	res.json(targetListing);
};

// delete a listing
exports.deleteListing = async (req, res) => {
	await Listing.findByIdAndRemove(req.params.id);
	res.status(204).end();
};

// edit listing
exports.editListing = async (req, res) => {
	const findListing = await Listing.findById(req.params.id);
	const output = findListing.overwrite(req.body);
	output.save();

	res.json(output);
};

// get listing comments
exports.getListingComments = async (req, res) => {
	const targetListing = await Listing.findById(req.params.id);
	const commentsArray = targetListing.comments;

	res.json(commentsArray);
};
