const mongoose = require("mongoose");



const MemberSchema = new mongoose.Schema({
   username: { type: String, unique: true, required: true },
   password: { type: String, required: true },
   display_name: { type: String, required: true },
   bookmarks: [
      new mongoose.Schema({
         listing_id: String,
      }),
   ],
   ratings: [
      new mongoose.Schema({
         rating: { type: Number },
         memberId: { type: String },
      }),
   ],
});

module.exports = mongoose.model("member", MemberSchema);
