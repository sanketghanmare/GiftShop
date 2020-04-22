const mongoose = require('mongoose');
const notificationSchema = require('./notificationsSchema')
const notificationModel = mongoose.model("NotificationModel", notificationSchema)

module.exports = notificationModel
