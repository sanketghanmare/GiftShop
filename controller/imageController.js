const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const imageSchema = require('../models/imageSchema');
const ImageModel = require('../models/imageModel');
const ImageRouter = express.Router();
const fs = require('fs');
const giftDao = require('../dao/giftDAO');

module.exports = (app) => {

    const storage = multer.diskStorage({
                                           destination: function (req, file, cb) {
                                               cb(null, './uploads');
                                           },
                                           filename: function (req, file, cb) {
                                               cb(null, Date.now() + file.originalname)
                                           }
                                       });

    const fileFilter = (req, file, cb) => {
        if (file.mimeType === 'image/jpeg' || file.mimeType === 'image/png') {
            cb(null, true);
        } else {
            cb(null, false)
        }
    };

    const upload = multer({
                              storage: storage,
                              limit: {
                                  fileSize: 1024 * 1024 * 5
                              }
                          });

    app.post('/seller/gift/image/:giftId', upload.single('imageData'), (req, res) => {
        console.log("Printing Body");
        console.log(req.params.giftId);
        console.log(req.body);
        console.log(req.file);

        let newImage = {
            imageName: req.body.imageName,
            imageData: req.file.path
        };
        let result = null;
        ImageModel.create(newImage)
            .then(resp => giftDao.updateGiftImage(req.params.giftId, resp._id)).then(res.json('ok'))

        //console.log()
        //console.log(newImage)
    });

    app.post('/seller/gift/image', upload.single('imageData'), (req, res) => {
        console.log(req.body);
        console.log(req.file);
        let newImage = {
            imageName: req.body.imageName,
            imageData: req.file.path
        };
        //let result = null;
        ImageModel.create(newImage).then(response => res.json(response._id))

    });

    app.get('/seller/gift/image/:_id', (req, res) => {
        console.log("here in Image");
        console.log("finding Image");
        let found = {};
        //if(req.params._id !== undefined)
        ImageModel.findById(req.params._id)
            .then((img) => fs.readFileSync(img.imageData))
            .then(x => res.json(x))

    })

};