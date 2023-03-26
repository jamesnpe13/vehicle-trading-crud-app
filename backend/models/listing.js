const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema({
   title: String,
   vehicle: String,
});

module.exports = mongoose.model("Listing", listingSchema);
