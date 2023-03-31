// express
const express = require("express");
const router = express.Router();

// controllers
const membersController = require("../controllers/membersController");

router
	.route("/")

	.get(membersController.getAllMembers)
	.post(membersController.createNewMember);

router
	.route("/:id")

	.get(membersController.getMemberById)
	.put(membersController.editMember);

router
	.route("/signin/:username")

	.get(membersController.getMemberByUsername);

router
	.route("/:id/ratings/calculate")

	.get(membersController.getAverageRating);

router
	.route("/:id/bookmarks")

	.get(membersController.getMemberBookmarks)
	.put(membersController.createBookmark);

router
	.route("/:id/ratings")

	.get(membersController.getRatingById)
	.put(membersController.makeNewRating);

router
	.route("/:id/listings")

	.get(membersController.getMemberListings);

module.exports = router;
