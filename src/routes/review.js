const express = require('express');
const Review = require('../models/review');

const router = express.Router();

//Get all reviews
router.get('/reviews', async (req, res) => {
  try {
    const reviews = await Review.find();
    res.send(reviews);
  } catch (err) {
    res.status(500).send(err);
  }
});

//Find one movie by ID
router.get('/reviews/:id', async (req, res) => {
  try {
    const review = await Review.findOne({_id: req.params.id});
    if (!review) {
      return res.status(404).send('Review not found');
    }
    res.send(review);
  } catch (err) {
    res.status(500).send(err);
  }
});

//Post movie details
router.post('/reviews', (req, res) => {
    const { movieReviewTitle, reviewRating, reviewAuthor, reviewAuthorUsername, reviewComment, reviewDate } = req.body;
    const review = new Review({ movieReviewTitle, reviewRating, reviewAuthor, reviewAuthorUsername, reviewComment, reviewDate });
  
    review.save()
      .then(() => {
        res.status(201).send('Review Created ');
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send('Internal Server Error');
      });
});

//Patch review details
router.patch('/reviews/:reviewId', (req, res) => {
  const reviewId = req.params.reviewId;
  const { movieReviewTitle, reviewRating, reviewAuthor, reviewAuthorUsername, reviewComment, reviewDate } = req.body;

  Review.findById(reviewId)
    .then((review) => {
      if (!review) {
        return res.status(404).send('Review not found');
      }

      if (movieReviewTitle) {
        review.movieReviewTitle = movieReviewTitle;
      }

      if (reviewRating) {
        review.reviewRating = reviewRating;
      }

      if (reviewAuthor) {
        review.reviewAuthor = reviewAuthor;
      }

      if (reviewAuthorUsername) {
        review.reviewAuthorUsername = reviewAuthorUsername;
      }

      if (reviewComment) {
        review.reviewComment = reviewComment;
      }

      if (reviewDate) {
        review.reviewDate = reviewDate;
      }

      return review.save();
    })
    .then(() => {
      res.send('Review updated successfully');
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Internal Server Error');
    });
});

//Delete review
router.delete('/reviews/:reviewId', (req, res) => {
  const reviewId = req.params.reviewId;

  Review.findByIdAndDelete(reviewId)
    .then((review) => {
      if (!review) {
        return res.status(404).send('Review not found');
      }

      res.send('Review deleted successfully');
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Internal Server Error');
    });
});

module.exports = router;