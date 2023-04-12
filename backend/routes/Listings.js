// express
const express = require("express");
const router = express.Router();

// controllers
const listingsController = require("../controllers/listingsController");

// middlewares
const uploadImage = require("../middlewares/imageUploadMiddleware");

router
	.route("/")

	.get(listingsController.getAllListings)
	.post(uploadImage, listingsController.createNewListing);

router
	.route("/:id")

	.get(listingsController.getListingById)
	.put(listingsController.editListing)
	.delete(listingsController.deleteListing);

router
	.route("/:id/comments")

	.get(listingsController.getListingComments)
	.put(listingsController.createNewComment);

router.get("/uploads/:name", (req, res) => {
	res.download("./uploads/" + req.params.name);
});

module.exports = router;
