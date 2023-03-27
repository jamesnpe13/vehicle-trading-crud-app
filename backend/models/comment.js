const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema({
});

module.exports = mongoose.model("Listing", listingSchema);
