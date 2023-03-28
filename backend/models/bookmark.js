const mongoose = require('mongoose');

const BookmarkSchema = new mongoose.Schema({
    listing_id: String,
});

// module.exports = BookmarkSchema;
module.exports = mongoose.model("Bookmark", BookmarkSchema);





