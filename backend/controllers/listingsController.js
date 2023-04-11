// models
const Listing = require("../models/listing");
const Member = require("../models/member");

// get all listings
exports.getAllListings = async (req, res) => {
    const result = await Listing.find({}).populate("owner_id");

    res.json(result);
};

// get a listing by ID
exports.getListingById = async (req, res) => {
	try {
		const result = await Listing.findOne({ _id: req.params.id });
		res.json(result);
	} catch (error) {
		console.log(error);
		res.send(error);
	}
};

// create a new listing
exports.createNewListing = async (req, res) => {
	const date = new Date();
	const dateFormat = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

	const reqBody = JSON.parse(req.body.content);
	let imagesArray = [];

	for (let image of req.files) {
		imagesArray.push(image.filename);
	}

	const newListing = await Listing.create({
		...reqBody,
		images: imagesArray,
		post_date: dateFormat,
	});
	const targetUser = await Member.findById(reqBody.owner_id);
	targetUser.listings = [...targetUser.listings, newListing];

	targetUser.save();
	console.log(newListing);
	res.send(newListing);
};

// create new comment
exports.createNewComment = async (req, res) => {
    // new array item/object
    const date = new Date();
    const newComment = {
        owner_id: req.body.owner_id,
        body: req.body.body,
        post_date: `${date.getDate()}/${
            date.getMonth() + 1
        }/${date.getFullYear()}`,
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
