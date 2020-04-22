const mongoose = require("mongoose");
const reviewSchema = mongoose.Schema({
                                gift: {type:mongoose.Schema.Types.ObjectId, ref:'GiftModel'},
                                rating : Number
                    }, {collection: "reviews"});

module.exports = reviewSchema;
