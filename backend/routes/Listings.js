const express = require("express");
const router = express.Router();

const Listing = require("../models/listing");
const Member = require("../models/member");

router.get("/", async (req, res) => {
   const result = await Listing.find({});

   res.json(result);
});

router.get("/:id", async (req, res) => {
   try {
      const result = await Listing.find({ _id: req.params.id });
      res.json(result);
   } catch (error) {
      console.log(error);
      res.send(error);
   }
});

router.get("/:member/listings", async (req, res) => {
   const result = await Listing.find({ member: req.params.member });

   res.json(result);
});

router.post("/", async (req, res) => {
   const date = new Date();

   const targetUser = await Member.findById(req.body.owner_id);
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

   targetUser.listings = [...targetUser.listings, newListing];
   targetUser.save();

   console.log(targetUser.listings);
   res.json(newListing);
});



router.put("/:id/comments", async (req, res) => {
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

router.delete("/:id", async (req, res) => {
   await Listing.findByIdAndRemove(req.params.id);
   res.status(204).end();
});

router.put("/:id/editlisting", async (req, res) => {
   const findListing = await Listing.findById(req.params.id);
   const output = findListing.overwrite(req.body);
   output.save();

   res.json(output);
});

router.get("/:id/comments", async (req, res) => {
   const targetListing = await Listing.findById(req.params.id);
   const commentsArray = targetListing.comments;

   res.json(commentsArray);
});

module.exports = router;
