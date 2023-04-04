const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema({
    owner_id: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "Member",
    },

    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: String, required: true },
    location: { type: String, required: true },
    post_date: { type: String, required: true },
    vehicle: new mongoose.Schema({
        make: { type: String, required: true },
        model: { type: String, required: true },
        year: { type: String, required: true },
        mileage: { type: String, required: true },
        transmission: { type: String, required: true },
        body_type: String,
        color: String,
        registration: new mongoose.Schema({
            valid: { type: Boolean, required: true },
            registration_number: { type: String, required: true },
            expiration: { type: String, required: true },
        }),

        wof: new mongoose.Schema({
            valid: Boolean,
            expiration: { type: String, required: true },
        }),
    }),
    comments: [
        new mongoose.Schema({
            owner_id: String,
            body: String,
            post_date: String,
        }),
    ],
});

module.exports = mongoose.model("Listing", listingSchema);
