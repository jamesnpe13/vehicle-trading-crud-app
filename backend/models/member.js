const { number } = require("joi");
const mongoose = require("mongoose");
// const Bookmark = require("./bookmark");

const MemberSchema = new mongoose.Schema({
   username: { type: String, unique: true, required: true },
   password: { type: String, required: true },
   display_name: { type: String, required: true },
   bookmarks: [],
   ratings: [
      // new schema here (do not export)
   ],
});

module.exports = mongoose.model("member", MemberSchema);
