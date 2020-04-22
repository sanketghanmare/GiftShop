const mongoose = require('mongoose');
const orderSchema = require('./orderSchema');
const orderModel = mongoose.model("OrderModel", orderSchema);

module.exports = orderModel;
