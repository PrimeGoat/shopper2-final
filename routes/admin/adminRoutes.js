const router = require('express').Router();
const { waterfall } = require('async')
const faker = require('faker');

const Product = require('./products/models/Product');
const Category = require('./categories/models/Category');
const { validationResult } = require('express-validator');
const checkCategory = require('./categories/utils/checkCategory');
const { createProducts } = require('./helper/createProducts');
const { categoryValidation } = require('./adminValidation/categoryValidation');

router.get('/add-category', (req, res, next) => {
    return res.render('admin/add-category');
});


router.post('/add-category', checkCategory, categoryValidation, (req, res, next) => {



        const category = new Category();
        category.name = req.body.name;

        category.save().then((savedCategory) => {
            createProducts(savedCategory.name);
            // req.flash('messages', 'Successfully added category now req.flash works');
            // console.log(req.flash('messages'))
            // res.json({ message: 'Success', category: savedCategory });
            // 
            req.flash('messages', `Successfully added ${req.body.name.toUpperCase()} category and 24 products`);
            return res.redirect('/api/admin/add-category');
        }).catch((err) => {
            if(err.code === 11000) {
                req.flash('errors', 'Category already exists');
                return res.redirect('/api/admin/add-category');
            } else {
                return next(err);
            }

        });

});

// router.get('/create-product/:name', (req, res) => {
//     waterfall([
//         (callback) => {
//             Category.findOne({name: req.params.name}, (err, category) => {
//                 if(err) return next(err);
//                 callback(null, category);
//             });
//         },
//         (category) => {
//             for (let i = 0; i < 24; i++) {
//                 const product = new Product();
//                 product.category = category._id;
//                 product.name = faker.commerce.productName();
//                 product.price = faker.commerce.price();
//                 product.image = `/images/products2/${i}.jpg`;
//                 product.description = faker.lorem.paragraph();
//                 product.save();
//             }
//         }
//     ]);
//     // res.json({ message: 'Success'});
//     req.flash('messages', `Successfully added ${req.params.name.toUpperCase()} category and 24 products`);
//     return res.redirect('/api/admin/add-category');
// });

module.exports = router;