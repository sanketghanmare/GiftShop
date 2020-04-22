const mongoose = require("mongoose");
const giftSchema = require('./giftSchema');
const orderDetailsSchema = require('./orderDetailsSchema');
const orderSchema = mongoose.Schema({
                                      orderDetails: [{type:mongoose.Schema.Types.ObjectId, ref:'OrderDetailsModel',unique: false}],
                                      buyer: {type: mongoose.Schema.Types.ObjectId, ref:'UserModel',unique: false},
                                      totalAmount: Number,
                                      deliveryAddress : String
                                   }, {collection : "orders"});

module.exports = orderSchema;
