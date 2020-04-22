const mongoose = require("mongoose");
const categorySchema = mongoose.Schema({
                                      categoryName: {type: String, unique: true},
                                      catType :{type: String, enum:['Parent','Child'], required:true,},
                                      parentCategory: {type: String, ref:'CategoryModel'}
                                   }, {collection : "categories"});

module.exports = categorySchema;
