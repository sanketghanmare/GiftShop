const mongoose = require("mongoose");
const orderSchema = require('./orderSchema')
const OrderModel = require('./orderModel')
const sellerSchema = mongoose.Schema({
                                        ordersForMe : [{type: mongoose.Schema.Types.ObjectId, ref: 'OrderModel'}],
                                        mySubsribers : [{type : mongoose.Schema.Types.ObjectId, ref:'UserModel'}]
                                    });

module.exports = sellerSchema;
