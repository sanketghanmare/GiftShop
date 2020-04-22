const userDao = require('../dao/userDao');
const notificationDao = require('../dao/notificationDao')
const orderDao = require('../dao/orderDao')
const giftBasketDao = require('../dao/giftBasketDao')
module.exports = (app) => {

    app.post('/register', (req, res) => {
                 console.log("in Server");
                 console.log(req.body);
                 //var user = req.body;
                 userDao.createUser(req.body)
                     .then(newUser => res.json(newUser))
             }
    );

    app.get('/login/username/:username/password/:password/role/:role', (req, res) => {
                console.log(req.params.username);
                userDao.findByUserName(req.params.username).then((user) => {
                                                                     //console.log(user.role);
                                                                     if(user!== null) {
                                                                         console.log(user);
                                                                         if (req.params.password
                                                                             === user.password
                                                                             && req.params.role
                                                                             === user.role) {
                                                                             return res.json(user)
                                                                         } else {
                                                                             return res.json(
                                                                                 "error")
                                                                         }
                                                                     }
                                                                     else {
                                                                         return res.json('error')
                                                                     }
                                                                 }
                )

            }
    );

    //Admin
    app.get('/admin/allusers', (req, res) => {
        userDao.findAllUsers().then(users => res.json(users))
    });

    app.get('/admin/user/:id', (req, res) => {
        userDao.findUserById(req.params.id).then(user => res.json(user));
    });

    app.post(`/admin/seller/create`, (req,res) => {
        console.log(req.body)
        userDao.createUser(req.body).then(newUser => res.json(newUser))
    })


    app.delete('/admin/user/delete/:id/:role', (req, res) => {
        console.log(req.params.id);
        console.log("role", req.params.role);
        if(req.params.oldRole === 'Buyer') {
            notificationDao.deleteNotificationsForBuyer(req.params.id).then(response => console.log(response))
            userDao.deleteThisSubscriber(req.params.id).then(response => console.log(response))
            giftBasketDao.deleteBasketForBuyer(req.params.id).then(response => console.log(response))
            orderDao.deleteOrderForBuyer(req.params.id).then(resp => console.log(resp))
        }
        if(req.params.role === 'Seller') {
            notificationDao.deleteNotificationsForSeller(req.params.id).then(response => console.log(response))
            userDao.deleteThisSubscription(req.params.id).then(response => console.log(response))
            userDao.deleteAllGiftsForSeller(req.params.id).then(response => console.log(response))
            userDao.deleteOrderDetailsForSeller(req.params.id).then(response => console.log(response))
        }
        userDao.deleteUserById(req.params.id).then(status => res.send(status))
    });

    app.post(`/admin/user/edit/:id`, async (req, res) => {
        console.log(req.body.role, req.body.oldRole)
        if(req.body.role!==req.body.oldRole) {
            if(req.body.oldRole === 'Seller') {
                console.log("deleting all the seller info")
                await userDao.deleteAllGiftsForSeller(req.params.id).then(response => console.log(response))
                await notificationDao.deleteNotificationsForSeller(req.params.id).then(response => console.log(response))
                await userDao.deleteThisSubscription(req.params.id).then(response => console.log(response))
                await userDao.deleteOrderDetailsForSeller(req.params.id).then(response => console.log(response))
            }
            if(req.body.oldRole === 'Buyer') {
                console.log("deleting all the buyer info")
                await notificationDao.deleteNotificationsForBuyer(req.params.id).then(response => console.log(response))
                await userDao.deleteThisSubscriber(req.params.id).then(response => console.log(response))
                await giftBasketDao.deleteBasketForBuyer(req.params.id).then(response => console.log(response))
                await orderDao.deleteOrderForBuyer(req.params.id).then(resp => console.log(resp))
            }
            console.log(req.body.role, req.body.oldRole)
        }

        userDao.updateUserById(req.params.id, req.body).then(response => {
            console.log("database response", response);
            res.json(response)
        })
    })

    app.post(`/user/edit/profile/:id`, (req, res) => {
        userDao.updateUserProfile(req.params.id, req.body).then(response => {
            console.log("database response", response);
            res.json(response)
        })
    })



    app.post(`/buyer/:buyerId/subscribe/:sellerId` , (req,res) => {
        console.log(req.params.buyerId, req.params.sellerId)
        userDao.addSubscriptionForBuyer(req.params.buyerId, req.params.sellerId).then(response => res.json(response))
    })
    
    app.get(`/buyer/subscribers/:buyerId`, (req,res) => {
        userDao.getSubscriptionsForBuyer(req.params.buyerId).then(response => res.json(response))  
    })
    
    app.post(`/buyer/subscribers/:buyerId/unsubscribe/:sellerId` , (req,res) => {
        userDao.unSubscribe(req.params.buyerId, req.params.sellerId).then(user => res.json(user))
    })
};


