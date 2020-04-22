const express = require('express');
const multer = require('multer')
const mongoose = require('mongoose');
const imageSchema = require('./imageSchema')

const ImageModel = mongoose.model("ImageModel",imageSchema)


module.exports = ImageModel;