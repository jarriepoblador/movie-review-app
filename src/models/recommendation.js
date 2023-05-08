const mongoose = require('mongoose');

const recommendationSchema = new mongoose.Schema({
  username: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  movieTitle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',
    required: true,
  },
  reviewComment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Recommendation = mongoose.model('Recommendation', recommendationSchema);

module.exports = Recommendation;
