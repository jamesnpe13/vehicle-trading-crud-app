const mongoose = require("mongoose");

const MemberSchema = new mongoose.Schema({
    username: {type:String,unique: true,required:true},
    password: {type:String,required:true},
    display_name: {type:String,required:true}
});

module.exports = mongoose.model("member", MemberSchema);
