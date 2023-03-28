const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    display_name: { type: String, required: true },
    comment: { type: String, required: true },
    post_date: { type: String },
});

module.exports = mongoose.model("Comment", commentSchema);
