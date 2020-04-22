const mongoose = require("mongoose");
const giftSchema = require('./giftSchema');
const orderSchema = require('./orderSchema');
const orderHistorySchema = mongoose.Schema({
                                        order : orderSchema,
                                        deliveredOn: Date,
              }, {collection : "ordersHistory"});

module.exports = orderHistorySchema;