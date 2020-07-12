const { waterfall } = require('async')
const faker = require('faker');
const Product = require('../products/models/Product');
const Category = require('../categories/models/Category');

module.exports = {

    createProducts: (nameCategory) => {         
        
        return new Promise ((resolve, reject) => {

            waterfall([
                (callback) => {
                    Category.findOne({name: nameCategory}, (err, category) => {
                        if(err) return next(err);
                        callback(null, category);
                    });
                },
                (category) => {
                    for (let i = 0; i < 24; i++) {
                        const product = new Product();
                        product.category = category._id;
                        product.name = faker.commerce.productName();
                        product.price = faker.commerce.price();
                        product.image = `/images/products2/${i}.jpg`;
                        product.description = faker.lorem.paragraph();
                        product.save();
                    }
                }
            ], resolve());
            // res.json({ message: 'Success'});
            
        }).catch((error) => {
            reject(error);
        })
    }
}