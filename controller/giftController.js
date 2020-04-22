const giftDao = require('../dao/giftDAO');
const notificationDao = require('../dao/notificationDao')
module.exports = (app) => {


  app.get('/buyer/searchgifts/gender/:gender', (req, res) => {
        console.log("searching gift");
        console.log(req.params.gender);
        giftDao.findGiftByGender(req.params.gender).then((gift) =>

            res.json(gift))
      });

  app.get('/seller/mygifts/:sellerid', (req, res) => {
        console.log("searching gift");
        console.log(req.params.sellerid);
        giftDao.findGiftsBySeller(req.params.sellerid).then((gifts) =>
            res.json(gifts));
        //console.log("Gifts by Gender" + gifts);
      }
  );

  // app.post('/seller/gift/create', (req, res) => {
  //   console.log(req.body);
  //   giftDao.createGift(req.body).then(newGift => res.json(newGift))
  // });

  // app.delete('/seller/gift/delete/:id', (req, res) => {
  //   console.log(req.params.id);
  //   giftDao.deleteGiftById(req.params.id).then(status => res.send(status))
  // });

  app.post('/seller/gift/edit/:id', (req, res) => {
    console.log('reached server');
    //console.log(req.body)
    //console.log(req.params.id)
    giftDao.updateGiftById(req.params.id, req.body).then(response => {
      console.log("database response", response);
      res.json(response)
    })})

    // app.get('/buyer/searchgifts/gender/:gender', (req, res) => {
    //             console.log("searching gift");
    //             console.log(req.params.gender);
    //             giftDao.findGiftByGender(req.params.gender).then((gift) => res.json(gift))
    //         }
    // );

    // app.get('/seller/mygifts/:sellerid', (req, res) => {
    //             console.log("searching gift");
    //             console.log(req.params.sellerid);
    //             giftDao.findGiftsBySeller(req.params.sellerid).then((gifts) => res.json(gifts));
    //         }
    // );

    app.post('/seller/gift/create', async (req, res) => {
        console.log(req.body);
        await giftDao.createGift(req.body).then( async newGift => {
            await notificationDao.createNotification(req.body.Seller, newGift._id);
            return res.json(newGift);
        })

    });

    app.delete('/seller/gift/delete/:id', async (req, res) => {
        console.log(req.params.id);
        await notificationDao.deleteNotificationForGift(req.params.id)
        giftDao.deleteGiftById(req.params.id).then(status => res.send(status))
    });

    // app.post('/seller/gift/edit/:id', (req, res) => {
    //     console.log('reached server');
    //     //console.log(req.body)
    //     //console.log(req.params.id)
    //     giftDao.updateGiftById(req.params.id, req.body).then(response => {
    //         console.log("database response", response);
    //         res.json(response)
    //     })
    // });

    app.get('/admin/allgifts', (req, res) => {
        giftDao.findAllGifts().then(gifts => res.json(gifts))
    });


  // app.get('/admin/allgifts', (req, res) => {
  //   giftDao.findAllGifts().then(gifts => res.json(gifts))
  // })




  app.delete('/seller/gift/delete/:id', (req, res) => {
    console.log(req.params.id)
    giftDao.deleteGiftById(req.params.id).then(status => res.send(status))
  })

  app.post('/seller/gift/edit/:id', (req, res) => {
    console.log('reached server')
    //console.log(req.body)
    //console.log(req.params.id)
    giftDao.updateGiftById(req.params.id, req.body).then(response => {
      console.log("database response", response);
      res.json(response)
    })
  })

  // app.get('/admin/allgifts', (req, res) => {
  //   giftDao.findAllGifts().then(gifts => res.json(gifts))
  // })

  //buyer
  app.get(`/buyer/gifts/:categories`, (req, res) => {
    giftDao.findGiftByCategories(req.params.categories.split(',')).then(
        gifts => res.json(gifts))

  })

  app.post(`/seller/gift/edit`,(req,res)=>{
    console.log(req.body.giftId)
    console.log(req.body.quantity)
    giftDao.updateQuantityAfterOrder(req.body.giftId,req.body.quantity)
  })






};

