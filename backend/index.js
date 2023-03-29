// modules
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Joi = require("joi");

// instantiate express app
const app = express();

// middleware
app.use(express.json());
app.use(cors());

// models
const Listing = require("./models/listing");
const Member = require("./models/member");
const Comment = require("./models/comment");
const Bookmark = require("./models/bookmark");
const Rating = require("./models/rating");

// ============== GET requests ===============

// all  members
app.get("/members", async (req, res) => {
   try {
      const result = await Member.find({});
      res.json(result);
   } catch (error) {
      res.send(error);
   }
});

// single member
// app.get("/members/:username", async (req, res) => {
//    try {
//       const result = await Member.find({ username: req.params.username });
//       if (result.length > 0) {
//          res.json(result);
//       } else {
//          res.send("no match found");
//       }
//    } catch (error) {
//       res.send(error);
//    }
// });

app.get("/members/:id", async (req, res) => {
   try {
      const result = await Member.findById(req.params.id);
      res.json(result);
      // if (result.length > 0) {
      // } else {
      //    res.send("no match found");
      // }
   } catch (error) {
      res.send(error);
   }
});

app.get("/signin/:username", async (req, res) => {
   try {
      const result = await Member.find({ username: req.params.username });
      if (result.length > 0) {
         res.json(result[0]);
      } else {
         res.send("no match found");
      }
   } catch (error) {
      res.send(error);
   }
});

// ALl listings
app.get("/listings", async (req, res) => {
   const result = await Listing.find({});

   res.json(result);
});

// listing by ID
app.get("/listings/:id", async (req, res) => {
   try {
      const result = await Listing.find({ _id: req.params.id });
      res.json(result);
   } catch (error) {
      console.log(error);
      res.send(error);
   }
});

// listing by member
app.get("/listings/:member/listings", async (req, res) => {
   const result = await Listing.find({ member: req.params.member });

   res.json(result);
});

// ============== POST requests ===============
// new listing
app.post("/listings", async (req, res) => {
   const date = new Date();
   const newListing = await Listing.create({
      owner_id: req.body.owner_id,
      title: req.body.title,
      description: req.body.description,
      post_date: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
      vehicle: {
         make: req.body.vehicle.make,
         model: req.body.vehicle.model,
         year: req.body.vehicle.year,
         mileage: req.body.vehicle.mileage,
         transmission: req.body.vehicle.transmission,
         body_type: req.body.vehicle.body_type,
         color: req.body.vehicle.color,
         registration: {
            valid: req.body.vehicle.registration.valid,
            registration_number: req.body.vehicle.registration.registration_number,
            expiration: req.body.vehicle.registration.expiration,
         },
         wof: {
            valid: req.body.vehicle.wof.valid,
            expiration: req.body.vehicle.wof.expiration,
         },
      },
      comments: [],
   }).catch((err) => {
      res.json(err);
   });

   res.json(newListing);
});

// New Member
app.post("/members", async (req, res) => {
   try {
      const newMember = await Member.create({
         username: req.body.username,
         password: req.body.password,
         display_name: req.body.display_name,
      });
      res.json(newMember);
   } catch (error) {
      res.send(error);
   }
});

// update comments array by listing
app.put("/listings/:id/comments", async (req, res) => {
   // new array item/object
   const date = new Date();
   const newComment = {
      owner_id: req.body.owner_id,
      body: req.body.body,
      post_date: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
   };

   // target document
   const targetListing = await Listing.findById(req.params.id);

   // existing array concatinated with new array item
   const commentsArray = targetListing.comments.concat(newComment);

   // manual key-value change
   targetListing.comments = commentsArray;

   // save changes
   await targetListing.save();

   // response
   res.json(targetListing);
});

// get all comments by listing
app.get("/listings/:id/comments", async (req, res) => {
   const targetListing = await Listing.findById(req.params.id);
   const commentsArray = targetListing.comments;

   res.json(commentsArray);
});

app.get("/members/:id/ratings", async (req, res) => {
   const targetUser = await Member.findById(req.params.id);
   const ratingsArray = targetUser.ratings;

   res.json(ratingsArray);
});

// ===================================================================
app.get("/members/:id/ratings/calculate", async (req, res) => {
   const targetUser = await Member.findById(req.params.id);
   const ratingsArray = targetUser.ratings;
   let sum = 0;
   let averageRating;

   ratingsArray.forEach((item) => {
      sum += item.rating;
   });

   averageRating = parseFloat((sum / ratingsArray.length).toFixed(1));

   res.json({
      average: averageRating,
      all_ratings: ratingsArray,
   });
});
// ===================================================================

// post rating
app.put("/members/:id/ratings", async (req, res) => {
   const newRating = {
      rating: req.body.rating,
      memberId: req.body.user_id,
   };
   const targetMember = await Member.findById(req.params.id);
   const ratingsArray = targetMember.ratings.concat(newRating);
   targetMember.ratings = ratingsArray;
   await targetMember.save();
   res.json(ratingsArray);
});

// ============== DELETE requests ===============

// delete listings by member

app.delete("/listings/:id", async (req, res) => {
   await Listing.findByIdAndRemove(req.params.id);
   res.status(204).end();
});

// ============== PUT requests ===============
app.get("/members/:id/bookmarks", async (req, res) => {
   const targetUser = await Member.findById(req.params.id);
   const bookmarksArray = targetUser.bookmarks;

   res.json(bookmarksArray);
});

app.put("/members/:id/bookmarks", async (req, res) => {
   const newBookmark = {
      listing_id: req.body.listing_id,
   };

   const targetUser = await Member.findById(req.params.id);
   const bookmarksArray = targetUser.bookmarks.concat(newBookmark);

   targetUser.bookmarks = bookmarksArray;

   await targetUser.save();

   res.json(bookmarksArray);
});

// ============================================

// connection
main().catch((error) => {
   console.log(error);
});

async function main() {
   await mongoose.connect(process.env.DB_STRING);
}

// listen server
const port = process.env.PORT;
app.listen(port || 5000, () => console.log(`server listening on port: ${port}`));
