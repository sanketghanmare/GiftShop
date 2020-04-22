const mongoose = require('mongoose');
const giftBasketSchema = require('./giftBasketSchema')
const giftBasketModel = mongoose.model("GiftBasketModel", giftBasketSchema)

module.exports = giftBasketModel
