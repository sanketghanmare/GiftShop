const mongoose = require("mongoose");
const orderSchema = require('./orderSchema');
const OrderModel = require('./orderModel');
const buyerSchema = mongoose.Schema({
                                        myOrders : [{type: mongoose.Schema.Types.ObjectId, ref: 'OrderModel'}],
                                        mySubsriptions : [{type : mongoose.Schema.Types.ObjectId, ref:'UserModel'}]
                                   });

module.exports = buyerSchema;
