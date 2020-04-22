const giftBasketModel = require('../models/giftBasketModel');
const mongoose = require('mongoose');

function createGiftBasketEntry(entry){
  return giftBasketModel.create(entry);
}

function deleteGiftBasketEntry(bid){
  return giftBasketModel.deleteOne({_id:bid});
}

async function deleteBasketForBuyer(buyerId) {
  console.log("deleting basket for ", buyerId)
  await giftBasketModel.deleteMany({buyer : buyerId})
}

function findGiftBasketEntry(id){
  console.log("In GiftBasketModel")
  return giftBasketModel.find({buyer :  mongoose.Types.ObjectId(id) }).populate('gift');

}

function findGiftBasketByBasketId(id){
  console.log("fetching by id")
  return giftBasketModel.find({_id:id}).populate('gift')
}

module.exports ={
  createGiftBasketEntry,
  deleteGiftBasketEntry,
  findGiftBasketEntry,
  findGiftBasketByBasketId,
  deleteBasketForBuyer
}