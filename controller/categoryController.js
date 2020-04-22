const categoryDao = require('../dao/categoryDao');
module.exports = (app) => {

    app.get('/categories', (req, res) => {
                categoryDao.findAllCategories().then((categories) => {
                                                         //console.log(categories);
                                                         res.json(categories)
                                                     }
                )
            }
    );

    app.post('/admin/category/create', (req, res) => {
        console.log(req.body)
        categoryDao.createCategory(req.body).then(newCategory => res.json(newCategory))
    });

    app.put('/admin/category/edit/:categoryName', (req, res) => {
        console.log(req.body)
        console.log(req.params.categoryName)
        categoryDao.updateCategoryByName(req.params.categoryName, req.body).then(response => {
            console.log("database response", response);
            res.json(response)
        })
    });

    app.get('/allparentcategories', (req, res) => {
        categoryDao.findAllParentCategories().then(newCategory => res.json(newCategory))
    });

    app.delete('/admin/category/delete/:categoryname', (req, res) => {
        console.log(req.params.categoryname)
        categoryDao.deleteCategoryByName(req.params.categoryname)
            .then(removedCategory => res.json(removedCategory));
    });

    app.put('/category/edit/:id', (req, res) => {
        categoryDao.updateCategoryById(req.params.id, req.body).then(response => {
            res.json(response)
        })
    });

   /* app.get('/productsInfo', (req, res) => {
        categoryDao.findAllParentCategories().then(newCategory => res.json(newCategory))
    });
*/
    app.get('/products', (req, res) => {
        categoryDao.products().then(productsInfo => res.json(productsInfo))
    });
};