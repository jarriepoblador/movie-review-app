const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    movieReviewTitle: {
        type: String,
    },

    reviewRating: {
        type: Number,
        required: [true, "Please enter your rating."]
    },

    reviewAuthor: {
        type: String,
    },

    reviewAuthorUsername: {
        type: String,
    },

    reviewComment: {
        type: String,
        required: [true, "Please enter your comment."]
    },

    reviewDate: {
        type: Date,
        default: Date.now
    }
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;