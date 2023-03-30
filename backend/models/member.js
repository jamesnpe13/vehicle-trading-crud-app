const mongoose = require("mongoose");

const MemberSchema = new mongoose.Schema({
   username: { type: String, unique: true, required: true },
   password: { type: String, required: true },
   display_name: { type: String, required: true },
   bookmarks: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Listing",
      },
   ],
   ratings: [
      new mongoose.Schema({
         rating: { type: Number },
         memberId: { type: String },
      }),
   ],
   listings: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Listing",
      },
   ],
});

module.exports = mongoose.model("member", MemberSchema);
