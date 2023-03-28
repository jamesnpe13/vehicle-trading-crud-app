const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema({
    rating: { type: Number },
    memberId: { type: String },
});

module.exports = mongoose.model("rating", ratingSchema);
