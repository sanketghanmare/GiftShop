const mongoose = require("mongoose");

const orderDetailsSchema = mongoose.Schema({
                                  quantity: Number,
                                  gift:{type: mongoose.Schema.Types.ObjectId, ref:'GiftModel', unique:false},
                                  seller:{type: mongoose.Schema.Types.ObjectId, ref:'UserModel',unique: false},
                                  status:{type: String, enum:['Shipped','Accepted','Cancelled','Rejected','Delivered', 'Order Placed'], default:'Order Placed'},
                                  expectedDelivery: Date,
                                  parentOrder : {type: mongoose.Schema.Types.ObjectId, ref:'OrderModel'}
},{collection : "orderdetails"});

module.exports = orderDetailsSchema;