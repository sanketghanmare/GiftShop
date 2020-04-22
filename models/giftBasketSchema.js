const mongoose = require("mongoose");
const buyerSchema = require('./userSchema')
const giftSchema = require('./giftSchema')
const giftBasketSchema = mongoose.Schema({
                                           buyer : {type:mongoose.Schema.Types.ObjectId, ref : "UserModel"},
                                           gift : {type:mongoose.Schema.Types.ObjectId, ref : "GiftModel"},
                                            quantity : Number
                                       }, {collection : "giftbaskets"});

module.exports = giftBasketSchema;
