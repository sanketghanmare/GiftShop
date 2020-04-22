const express = require('express');
const app = express();
const mongoose = require("mongoose");
require("mongodb");
mongoose.connect('mongodb+srv://uradmin:admin3105@cluster0-s05zp.mongodb.net/giftshop1',
                 {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});

// load body parser library to parse JSON from HTTP BODY
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));

// configure CORS to give clients access from other domains
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers',
               'Content-Type, X-Requested-With, Origin');
    res.header('Access-Control-Allow-Methods',
               'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    next();
});

require('./controller/userController')(app);
require('./controller/giftController')(app);
require('./controller/imageController')(app);
require('./controller/categoryController')(app);
require('./controller/giftBasketController')(app);
require('./controller/notificationController')(app);
require('./controller/orderController')(app);

// serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    //set static folder
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server is running on port ${port}`));