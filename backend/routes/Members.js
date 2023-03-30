const express = require("express");
const router = express.Router();

const Member = require("../models/member");

router.get("", async (req, res) => {
   try {
      const result = await Member.find({});
      res.json(result);
   } catch (error) {
      res.send(error);
   }
});

router.get("/:id", async (req, res) => {
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

router.get("/signin/:username", async (req, res) => {
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

router.put("/:id/ratings", async (req, res) => {
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

router.get("/:id/ratings/calculate", async (req, res) => {
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

router.get("/:id/bookmarks", async (req, res) => {
   const targetUser = await Member.findById(req.params.id);
   const bookmarksArray = targetUser.bookmarks;

   res.json(bookmarksArray);
});

router.put("/:id/bookmarks", async (req, res) => {
   const newBookmark = {
      listing_id: req.body.listing_id,
   };

   const targetUser = await Member.findById(req.params.id);
   const bookmarksArray = targetUser.bookmarks.concat(newBookmark);

   targetUser.bookmarks = bookmarksArray;

   await targetUser.save();

   res.json(targetUser);
});

router.put("/:id/edituser", async (req, res) => {
   const findUser = await Member.findById(req.params.id);
   const userOutput = findUser.overwrite(req.body);
   userOutput.save();

   res.json(userOutput);
});

router.get("/:id/ratings", async (req, res) => {
   const targetUser = await Member.findById(req.params.id);
   const ratingsArray = targetUser.ratings;

   res.json(ratingsArray);
});

router.post("/", async (req, res) => {
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

module.exports = router;
