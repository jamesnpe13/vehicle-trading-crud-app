// express
const express = require("express");
const router = express.Router();

// controllers
const listingsController = require("../controllers/listingsController");

router
	.route("/")

	.get(listingsController.getAllListings)
	.post(listingsController.createNewListing);

router
	.route("/:id")

	.get(listingsController.getListingById)
	.put(listingsController.editListing)
	.delete(listingsController.deleteListing);

router
	.route("/:id/comments")

	.get(listingsController.getListingComments)
	.put(listingsController.createNewComment);

module.exports = router;
