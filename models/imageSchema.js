const mongoose = require("mongoose");
const ImageSchema = mongoose.Schema({
                                        imageName: String,
                                        imageData: {
                                            type: String,
                                            required : true
                                        }
                                    }, {collection : "images"});

module.exports = ImageSchema;