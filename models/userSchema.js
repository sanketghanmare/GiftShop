const mongoose = require("mongoose");
const buyerSchema = require('./buyerSchema')
const sellerSchema = require('./sellerSchema')
const userSchema = mongoose.Schema({
                                       username : String,
                                       password : String,
                                       firstName : String,
                                       lastName : String,
                                       role : {type : String, enum:['Buyer','Seller', 'Admin']},
                                       street1: String,
                                       street2: String,
                                       city: String,
                                       State: String,
                                       zip: String,
                                       cardNumber: Number,
                                       cvc: Number,
                                       cardType : String,
                                       sellerRating : Number,
                                       subscribers : [{type : mongoose.Schema.Types.ObjectId, ref:'UserModel'}],
                                       subscriptions : [{type : mongoose.Schema.Types.ObjectId, ref:'UserModel'}]

                                   }, {collection : "users"});

module.exports = userSchema;