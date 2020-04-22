const giftModel = require('../models/giftModel');
const notificationModel = require('../models/notificationModel')
const giftBasketModel = require('../models/giftBasketModel')
const orderDetailsModel = require('../models/orderDetailsModel')
function createGift(gift) {
    console.log(gift)
    return giftModel.create(gift);
};

function findGiftByOccasion(occasion){
    console.log(occasion);
    return giftModel.find({category: {$in:occasion}});
}

function findGiftByGenderAndOccasion(gender,occasion) {
    return giftModel.find({$and: [{category: {$in : gender}}, {category:{$in : occasion}}]})
}

//Admin
function findAllGifts(){
    return giftModel.find();
}

function findGiftByGender(gender){
    console.log(gender);
    return giftModel.find({category: {$in:gender}});
}

function findGift(gender,ocassion){
    if(ocassion.length>0 && gender.length > 0){
        return this.findGiftByGenderAndOccasion(gender,ocassion);
    }
    else if(ocassion.length > 0){
        return this.findGiftByOccasion(ocassion);
    }
    return findGiftByGender(gender);
}

function findGiftsBySeller(seller) {
    console.log("in Dao")
    console.log(seller)
    return giftModel.find({Seller : seller})
}

function updateGiftImage(giftId, imageId){
    console.log(giftId + " " + imageId )
    return giftModel.updateOne({_id:giftId},{$set:{imageName:imageId}})
}

function findGiftById(giftId) {
    return giftModel.findById(giftId)
}

async function deleteGiftById(giftid) {
    console.log("deleting gift in DAO")
    console.log(giftid)
    await notificationModel.deleteMany({newGift : giftid});
    await giftBasketModel.deleteMany({gift : giftid})
    await orderDetailsModel.deleteMany({gift : giftid})
    return giftModel.deleteOne({_id : giftid})
}

function updateGiftById(giftId, gift) {
        return giftModel.findOneAndUpdate({_id: giftId}, gift, {new:true})
}

//buyer
function findGiftByCategories(categories) {
    console.log(categories)
    return giftModel.find({category : {$all : categories} }).populate('Seller')
}


/*function findAllUsers() {
    return userModel.find();
};

function findByUserName(username) {
    return userModel.findOne({username: username});
};

function findUserById(userId) {
    return userModel.findById(userId);
}*/

module.exports = {
    createGift,
    findGiftByGender,
    findGiftByOccasion,
    findGiftByGenderAndOccasion,
    findGiftsBySeller,
    findGift,
    updateGiftImage,
    findGiftById,
    deleteGiftById,
    updateGiftById,
    findAllGifts,
    findGiftByCategories
}