const mongoose = require('mongoose');
const orderHistorySchema = require('./orderHistorySchema');
const orderHistoryModel = mongoose.model("OrderHistoryModel", orderHistorySchema);

module.exports = orderHistoryModel;