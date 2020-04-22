const mongoose = require('mongoose');
const giftSchema = require('./giftSchema')
const giftModel = mongoose.model("GiftModel", giftSchema)

module.exports = giftModel
