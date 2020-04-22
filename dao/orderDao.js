const orderModel = require('../models/orderModel');
const orderDetailModel = require('../models/orderDetailsModel');
const giftBasketDao = require('../dao/giftBasketDao');

async function createOrder(body) {

  let seller = body.seller;
  let quantity = body.quantity;
  let giftId = body.giftId;
  let deliverInDay = body.deliveryInDay;
  let buyer = body.buyer;
  let total = body.total;
  let deliveryAddress = body.deliverAddress;
  let giftBasketId = body.giftBasketId;

  let order = {
    buyer : buyer,
    totalAmount : total,
    deliveryAddress: deliveryAddress,
  };


  let newOrder =  await orderModel.create(order);

  let orderDetails = [] ;

   for (let j = 0 ; j< seller.length;j++){
     let currentDate = new Date();
     currentDate.setDate(currentDate.getDate() + deliverInDay[j]);
     let orderDetail = {
       gift: giftId[j],
       seller:seller[j],
       quantity: quantity[j],
       expectedDelivery : currentDate,
       parentOrder : newOrder._id
     };

     let newOrderDetail = await orderDetailModel.create(orderDetail);
     orderDetails.push(newOrderDetail._id);
   }

   newOrder['orderDetails'] = orderDetails;
   newOrder.save();
   await orderModel.update({_id:newOrder._id}, newOrder);

   for(let i = 0; i<giftBasketId.length;i++){
     await giftBasketDao.deleteGiftBasketEntry(giftBasketId[i]);
   }


   return orderModel.findById(newOrder._id).populate({
     path: 'orderDetails',
     populate:{path:'gift'}
   });
}

async function getOrders(buyerId) {
  return orderModel.find({buyer:buyerId}).populate({
    path:'orderDetails',
    match : {status : {$nin : ['Delivered']}},
    populate:{path:'gift'}
  })
}

async function getDeliveredOrders(buyerId) {
    return orderModel.find({buyer:buyerId}).populate({
                                                         path:'orderDetails',
                                                         populate:{path:'gift'}
                                                     })
}

async function deleteOrder(orderId) {
    let orderDetails = []
    await orderModel.find({_id : orderId}, {orderDetails:1}).then(res => orderDetails = res);
    console.log("order details ",orderDetails[0]['orderDetails'])
    console.log(orderDetails[0]['orderDetails'].length)
    let orderD = orderDetails[0]['orderDetails']
    for(let i=0;i<orderD.length;i++) {
        console.log("in loop")
        await orderDetailModel.deleteOne({_id: orderD[i]}).then(res => console.log(res))
    }
    /*for(let i=0;i<orderDetails.length;i++)
        await orderDetailModel.deleteOne({_id:orderDetails[i]})*/
    await orderModel.deleteOne({_id:orderId})
}

async function deleteOrderForBuyer(buyerId) {
    //let allorders = []
    let orders = []
    await orderModel.find({buyer:buyerId},{_id:1}).then(res => orders = res)
    console.log("orders ", orders)
    for(let i=0;i<orders.length;i++)
        await deleteOrder(orders[i]._id)
}

async function getOrdersForSeller(sellerId) {
  return orderDetailModel.find({
    $and: [{seller: sellerId}, {status: {$nin: ['Delivered']}}]
  }).populate('gift')
}

async function updateOrderDetailStatus(orderId,status) {

  await orderDetailModel.update({_id:orderId},{$set: {status:status}})
  return orderDetailModel.find({_id:orderId}).populate('gift')
}



module.exports = {
  createOrder,
  getOrders,
  deleteOrder,
  deleteOrderForBuyer,
  getOrdersForSeller,
  updateOrderDetailStatus,
    getDeliveredOrders
}
