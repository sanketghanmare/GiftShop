const notificationModel = require('../models/notificationModel');
const userDao = require('../dao/userDao')
const mongoose = require('mongoose');

async function createNotification(sellerId, giftId) {
    let buyer = []
    let sellName = ''
    await userDao.findUserById(sellerId).then(res => {buyer = res.subscribers; sellName = res.firstName + res.lastName});
    console.log(buyer)
    await notificationModel.create({seller : sellerId, buyer : buyer, newGift : giftId, sellerName : sellName});
}

async function deleteNotificationForGift(giftId) {
    await notificationModel.deleteMany({newGift : giftId})
}

async function findNotificationsForBuyer(buyerId) {
    let buyer = mongoose.Types.ObjectId(buyerId)
    let subscriptions = []
    console.log("This is a buyer ", buyer)
    await userDao.findUserById(buyerId).then(response => subscriptions = response.subscriptions)
    console.log("subscriptions ", subscriptions)
    return notificationModel.find({seller : {$in: subscriptions }}).populate('newGift')
}

async function deleteNotificationByID(id) {
    return notificationModel.deleteOne({_id:id})
}

async function deleteNotificationsForBuyer(buyerId) {
    notificationModel.updateMany({},{$pull:{buyer: buyerId}})
}

async function deleteNotificationsForSeller(sellerId) {
    console.log("deleting notification for seller", sellerId)
    return notificationModel.deleteMany({seller : sellerId})
}

module.exports = {
    createNotification,
    deleteNotificationForGift,
    findNotificationsForBuyer,
    deleteNotificationByID,
    deleteNotificationsForBuyer,
    deleteNotificationsForSeller
}