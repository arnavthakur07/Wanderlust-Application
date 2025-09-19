const express = require("express")
const router = express.Router({ mergeParams: true });
const ExpressError = require("../utils/ExpressError.js")
const wrapAsync = require("../utils/wrapAsync.js");

const { reviewSchema } = require("../schema");

const {isLoggedIn,  isReviewAuthor} = require("../middleware.js")

const reviewController = require("../controller/reviews.js")








function validateReview(req, res, next) {
  console.log("Incoming review body:", req.body);
  const { error } = reviewSchema.validate(req.body, { convert: true }); 
  if (error) {
    const msg = error.details.map(el => el.message).join(",");
    return res.status(400).send(msg);
  }
  next();
}





router.post("/",isLoggedIn, validateReview,wrapAsync(reviewController.createReview));


// SHOW REVIEWS DELETE


router.delete("/:reviewId",isLoggedIn, isReviewAuthor, wrapAsync(reviewController.destroyReview));

module.exports = router;