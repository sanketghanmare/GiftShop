const userModel = require('../models/userModel');
const giftDao = require('../dao/giftDAO')
const orderDetailsModel = require('../models/orderDetailsModel')
function createUser(user) {
    console.log(user);
    return userModel.create(user);
};

function findAllUsers() {
    return userModel.find();
};

function findByUserName(username) {
    return userModel.findOne({username: username});
};

function findUserById(userId) {
    return userModel.findById(userId);
}

function deleteUserById(userId) {
    return userModel.deleteOne({_id: userId})
}

async function getSubscriptionsForBuyer(buyerId) {
    return userModel.findById(buyerId).populate('subscriptions');
}

async function unSubscribe(buyerId, sellerId){
    console.log(buyerId,sellerId)
    await userModel.updateOne({_id: sellerId}, {$pull:{subscribers : buyerId}})
    return userModel.findOneAndUpdate({_id:buyerId}, {$pull : {subscriptions : sellerId}}, {new : true}).populate('subscriptions')
}

async function deleteThisSubscriber(buyerId) {
    console.log("here in dao delete", buyerId)
    await userModel.updateMany({role : 'Seller'} , {$pull : {subscribers: buyerId}})
}

async function addSubscriptionForBuyer(buyerId, sellerId){
    await userModel.updateOne({_id:buyerId}, {$addToSet : {subscriptions : sellerId}})
    await userModel.updateOne({_id:sellerId}, {$addToSet : {subscribers : buyerId}})
    return userModel.findById(buyerId).populate('subscriptions')
}

async function deleteThisSubscription(sellerId) {
    console.log("here in dao delete subscription", sellerId)
    await userModel.updateMany({role : 'Buyer'} , {$pull : {subscriptions: sellerId}})
}

async function deleteAllGiftsForSeller(sellerId){
    let gifts = []
    await giftDao.findGiftsBySeller(sellerId).then(res => gifts = res)
    for(let i = 0; i < gifts.length; i++){
        console.log("deleting gift for ", sellerId)
        console.log(gifts[i]._id);
        await giftDao.deleteGiftById(gifts[i]._id)
    }
    return;
}

async function deleteOrderDetailsForSeller(sellerId) {
    orderDetailsModel.deleteMany({seller : sellerId})
}

async function updateUserById(userId, user) {
    await userModel.updateOne({_id: userId}, {
        $set:
            {
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.username,
                role: user.role,
                street1: user.street1,
                street2: user.street2,
                city: user.city,
                State: user.State,
                zip: user.zip,
                cardNumber: user.cardNumber,
                cvc: user.cvc
            }
    });

    user = await userModel.findOne({_id: userId});
    console.log("updated user ", user);
    return user;

}

async function updateUserProfile(userId, user){
    if(user.password.length > 0){
        await userModel.updateOne({_id:userId}, {$set: {password : user.password}})
    }

    await userModel.updateOne({_id: userId}, {
        $set:
            {
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.username,
                role: user.role,
                street1: user.street1,
                street2: user.street2,
                city: user.city,
                State: user.State,
                zip: user.zip,
                cardNumber: user.cardNumber,
                cvc: user.cvc,
                cardType: user.cardType
            }
    });
    user = await userModel.findOne({_id: userId});
    console.log("updated user ", user);
    return user;

}

module.exports = {
    createUser,
    findAllUsers,
    findUserById,
    findByUserName,
    deleteUserById,
    updateUserById,
    getSubscriptionsForBuyer,
    unSubscribe,
    deleteThisSubscriber,
    deleteThisSubscription,
    deleteAllGiftsForSeller,
    deleteOrderDetailsForSeller,
    addSubscriptionForBuyer,
    updateUserProfile
};