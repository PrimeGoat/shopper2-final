const express = require('express');
const router = express.Router();
const Product = require('./admin/products/models/Product');


/* GET home page. */

const paginate = (req, res, next) => {
  const perPage = 6;
  const page = req.params.pageNumber;
  Product.find().skip(perPage * (page-1)).limit(perPage).populate('category').exec((err, products) => {
    if(err) return next(err);
    Product.countDocuments().exec((err, count) => {
      if(err) return next(err);
      return res.render('main/home-products', { products, pages:Math.ceil(count/perPage), page: +page})
    })
  })
}


router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  // console.log('user', req.user);
  // console.log(req.session);
  if(req.user) {
    // res.send('Authorized Page');
    paginate(req, res, next);
    return;
  }
  res.render('main/home')
});

router.get('/page/:pageNumber', (req, res, next) => {
  return paginate(req, res, next)
})

router.get('/logout',(req,res)=>{
  req.logout();
  
  req.session.destroy()
  return res.redirect('/api/users/login')
});


module.exports = router;
