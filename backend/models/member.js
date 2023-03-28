const mongoose = require("mongoose");
// const Bookmark = require("./bookmark");

const MemberSchema = new mongoose.Schema({
    username: {type:String,unique: true,required:true},
    password: {type:String,required:true},
    display_name: {type:String,required:true},
    bookmarks:[],
});



module.exports = mongoose.model("member", MemberSchema);
