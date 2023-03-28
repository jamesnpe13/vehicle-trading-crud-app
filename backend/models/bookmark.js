const mongoose = require('mongoose');

const BookmarkSchema = new mongoose.Schema({
    listing_id:{
        type:mongoose.Schema.Types.ObjectId,required:true
    } 
});

module.exports = BookmarkSchema;





