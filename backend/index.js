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
const { findById } = require("./models/listing");

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
app.get("/members/:username", async (req, res) => {
   try {
      const result = await Member.find({ username: req.params.username });
      if (result.length > 0) {
         res.json(result);
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
      owner_id: "64214d957d41f7abf859d8d2",
      title: "Honda Accord for Sale!",
      description: "Brand new condition. Tires changed, oil filters changed. Very low mileage.",
      post_date: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
      vehicle: {
         make: "Honda",
         model: "Accord",
         year: "2005",
         mileage: 120000,
         transmission: "Automatic",
         body_type: "Sedan",
         color: "Silver",
         registration: {
            valid: true,
            // registration_number: "KWD125",
            // expiration: "26/09/2023",
         },
         wof: {
            valid: true,
            expiration: "08/10/2024",
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

// Post comment
app.post("/listings/:id/comments", async (req, res) => {
   const newComment = await comment.create({});
});

// ============== DELETE requests ===============

// delete listings by member

app.delete("/listings/:id", async (req, res) => {
   await Listing.findByIdAndRemove(req.params.id);
   res.status(204).end();
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
