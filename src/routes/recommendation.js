const express = require('express');
const Recommendation = require('../models/recommendation');

const router = express.Router();

//Get all recommendations
router.get('/recommendations', async (req, res) => {
  try {
    const recommendations = await Recommendation.find();
    res.send(recommendations);
  } catch (err) {
    res.status(500).send(err);
  }
});

//Find one recommendation by ID
router.get('/recommendations/:id', async (req, res) => {
  try {
    const recommendation = await Recommendation.findOne({_id: req.params.id});
    if (!recommendation) {
      return res.status(404).send('Recommendation not found');
    }
    res.send(recommendation);
  } catch (err) {
    res.status(500).send(err);
  }
});

//Post recommendation details
router.post('/recommendations', (req, res) => {
    const { username, movieTitle, reviewComment, createdAt } = req.body;
    const recommendation = new Recommendation({ username, movieTitle, reviewComment, createdAt });
  
    recommendation.save()
      .then(() => {
        res.status(201).send('Recommendation Created ');
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send('Internal Server Error');
      });
});

//Patch recommendation details
router.patch('/recommendations/:recommendationId', (req, res) => {
  const recommendationId = req.params.recommendationId;
  const { username, movieTitle, reviewComment, createdAt } = req.body;

  Recommendation.findById(recommendationId)
    .then((recommendation) => {
      if (!recommendation) {
        return res.status(404).send('Recommendation not found');
      }

      if (username) {
        recommendation.username = username;
      }

      if (movieTitle) {
        recommendation.movieTitle = movieTitle;
      }

      if (reviewComment) {
        recommendation.reviewComment = reviewComment;
      }

      if (createdAt) {
        recommendation.createdAt = createdAt;
      }

      return recommendation.save();
    })
    .then(() => {
      res.send('Recommendation updated successfully');
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Internal Server Error');
    });
});

//Delete recommendation
router.delete('/recommendations/:recommendationId', (req, res) => {
  const recommendationId = req.params.recommendationId;

  Recommendation.findByIdAndDelete(recommendationId)
    .then((recommendation) => {
      if (!recommendation) {
        return res.status(404).send('Recommendation not found');
      }

      res.send('Recommendation deleted successfully');
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Internal Server Error');
    });
});

module.exports = router;