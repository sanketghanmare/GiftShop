const giftBasketDao = require('../dao/giftBasketDao')

module.exports = (app) => {


  app.post(`/buyer/giftbasket/create`, (req, res) => {
        console.log("searching gift");
        console.log(req.body);
        //console.log(req.params.gender);
        giftBasketDao.createGiftBasketEntry(req.body).then((response) => res.json(response))
      }
  );

  app.delete(`/buyer/basket/:basketid`,(req,res)=>{

    giftBasketDao.deleteGiftBasketEntry(req.params.basketid).then(response =>{
      res.json(response)
    })
  })

  app.get(`/buyer/:id/giftCart`,(req,res)=>{
console.log(req.params.id);
    giftBasketDao.findGiftBasketEntry(req.params.id).then(response =>{
      console.log(response);
      res.json(response)
    })
  });

  app.get(`/basketid/:id/giftCart/`,(req ,res)=>{

    giftBasketDao.findGiftBasketByBasketId(req.params.id).then(response =>{
      console.log(response);
      res.json(response)
    })
  })
}