const mongoose = require("mongoose");

const MemberSchema = new mongoose.Schema({
    username: String,
    password: String,
    display_name: String,
});

module.exports = mongoose.model("member", MemberSchema);
