const mongoose = require("mongoose");
const userModel = require('./userModel');
const imageModel = require('./imageModel');
const giftSchema = mongoose.Schema({
                                       name : String,
                                       availableQuantity : Number,
                                        price: Number,
                                       Seller: {type: mongoose.Schema.Types.ObjectId, ref:'UserModel'},
                                       imageName: {type: mongoose.Schema.Types.ObjectId, ref:'ImageModel'},
                                       deliveryInDays: Number,
                                       category :[{type:String, ref:'CategoryModel'}]
                                   }, {collection : "gifts"});

module.exports = giftSchema;
