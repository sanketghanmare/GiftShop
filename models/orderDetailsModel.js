const mongoose = require('mongoose');
const orderDetailsSchema = require('./orderDetailsSchema');
const orderDetailsModel = mongoose.model("OrderDetailsModel", orderDetailsSchema);

module.exports = orderDetailsModel;