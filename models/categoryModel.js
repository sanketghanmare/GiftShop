const mongoose = require('mongoose');
const categorySchema = require('./categorySchema')
const categoryModel = mongoose.model("CategoryModel", categorySchema)

module.exports = categoryModel
