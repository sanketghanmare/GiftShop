const orderDao = require('../dao/orderDao')
module.exports = (app) => {


  app.post(`/buyer/order/create`,(req,res) =>{
    console.log(req.body);
    orderDao.createOrder(req.body).then(response => res.json(response))
  });

  app.get(`/buyer/:buyerId/orders`,(req,res)=>{
    console.log(req.params.buyerId);
    orderDao.getOrders(req.params.buyerId).then(response =>{
      console.log(response);
      res.json(response)})
  });

  app.get(`/buyer/:buyerId/deliveredorders`,(req,res)=>{
    console.log(req.params.buyerId);
    orderDao.getDeliveredOrders(req.params.buyerId).then(response =>{
      console.log(response);
      res.json(response)})
  });

  app.get(`/seller/:sellerId/orders`,(req,res)=>{
    console.log(req.params.sellerId);
    orderDao.getOrdersForSeller(req.params.sellerId).then(response =>{
      console.log(response);
      res.json(response)})
  })

  app.post(`/seller/order/:orderDetailId/status/:status/update`,(req,res)=>{
    console.log(req.params.orderDetailId)
    console.log(req.params.status)
    orderDao.updateOrderDetailStatus(req.params.orderDetailId,req.params.status).then(response =>{
      console.log(response);
      res.json(response);
    })
  })



}

