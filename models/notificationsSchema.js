const mongoose = require("mongoose");

const notificationSchema = mongoose.Schema({
                                         seller : {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
                                         buyer : [{type : mongoose.Schema.Types.ObjectId, ref:'UserModel'}],
                                         newGift : {type : mongoose.Schema.Types.ObjectId, ref:'GiftModel'},
                                         sellerName : {type : String}
                                     },{collection : "notifications"})

module.exports = notificationSchema;
