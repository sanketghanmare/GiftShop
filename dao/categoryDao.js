const categoryModel = require('../models/categoryModel');
const fetch = require("node-fetch");
function createCategory(category) {
    console.log(category);
    return categoryModel.create(category);
}

function findAllCategories() {
    return categoryModel.find();
}

function findCategoryById(catId) {
    return categoryModel.findById(catId);
}

function findAllParentCategories() {
    return categoryModel.distinct("parentCategory");
}

async function deleteCategoryByName(categoryName) {
    let category = {};
    await categoryModel.findOne({categoryName: categoryName}).then(category1 => category = category1);
    console.log(category)
    if(category.catType === 'Parent') {
        console.log("this is parent category")
        await categoryModel.deleteMany({parentCategory : categoryName})
    }
    return await categoryModel.deleteOne({categoryName: categoryName});
}

async function updateCategoryByName(categoryName, category){
    let newCatName = category.categoryName;
    await categoryModel.updateOne({categoryName: categoryName}, {
        $set:
            {
                categoryName: category.categoryName,
                catType: category.catType,
                parentCategory: category.parentCategory
            }
    });
    category = await categoryModel.findOne({categoryName: newCatName});
    console.log("updated category ", category);
    return category;
}

async function updateCategoryById(categoryId, category) {

    await categoryModel.updateOne({_id: categoryId}, {
        $set:
            {
                catType: category.catType,
                categoryName: category.categoryName,
                parentCategory: category.parentCategory
            }
    });
    category = await categoryModel.findOne({_id: categoryId});
    console.log("updated category ", category);
    return category;
}

async function products (){
    const api_url = `https://api.jumpseller.com/v1/products.json?login=7a1a011e796151114ac791983e6ce474&authtoken=82be3fbf7d6303cd4a3baa23f8c5961b&limit=50&page=1`;
    const response = await fetch(api_url);
    const json = await response.json();
    console.log(json);
    return json;
}

module.exports = {
    createCategory,
    findAllCategories,
    findCategoryById,
    findAllParentCategories,
    deleteCategoryByName,
    updateCategoryById,
    updateCategoryByName
};
