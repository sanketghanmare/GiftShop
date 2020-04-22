const mongoose = require('mongoose');
const reviewSchema = require('./reviewSchema')
const reviewModel = mongoose.model("ReviewModel", reviewSchema)

module.exports = reviewModel
