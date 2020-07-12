const express = require('express');
const router = express.Router();
const User = require('./models/User');
const userValidation =require('./utils/userValidation')
const { register, updateProfile, updatePassword } = require('./controllers/userController');
const passport = require('passport')
const { check, validationResult } = require('express-validator');
const { loginValidation, loginVerify } = require('./utils/loginValidation');

const { createUserCart } = require('../cart/controllers/cartController');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.render('main/home');
});

const thereIsAuth = (req, res, next) => {
  if(req.isAuthenticated()) {
    return res.redirect(301, '/');
  }
  next();
}



router.get('/register', (req,res)=>{
  if(req.user) {
    return res.redirect(301, '/');
  }
  res.render('auth/register');
}) 

router.post('/register', userValidation, register, createUserCart);
// router.post('/register', (req,res,next)=>{
//   User.findOne({email:req.body.email}).then((user)=>{
//     if(user){
//       return res.status(401).json({msg:'User Already Exists'})
//     }else{
//       const user = new User()
//       user.profile.name = req.body.name
//       user.email = req.body.email
//       user.password = req.body.password

//       user.save((err)=>{
//         if(err) return next(err)
//         return res.status(200).json({message: 'success', user})
//       })
//     }
//   })
// })

// const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             // console.log(errors.errors);
//             // return res.status(422).json({ err: errors.array() });
//             req.flash('errors', errors.errors[0].msg);
//             return res.redirect('/api/admin/add-category');


router.get('/login', (req, res)=>{
  if(req.user) {
    return res.redirect(301, '/');
  }
  return res.render('auth/login')
})

router.post('/login', loginValidation, loginVerify, passport.authenticate('local-login',{
  successRedirect:'/',
  failureRedirect:'/api/users/login',
  failureFlash:true
})
);

router.get('/profile', (req, res) => {
  // console.log(req.user);
  if (req.isAuthenticated()) {
    return res.render('auth/profile');

  } else {
    return res.send('Unauthorized');
  }
});

router.get('/update-profile', (req, res) => {
  return res.render('auth/update-profile');
});

router.put('/update-profile', (req, res, next) => {
  updateProfile(req.body, req.user._id)
    .then((user) => {
      return res.redirect(301, '/api/users/profile');
    }).catch((err) => next(err));
});

const checkPassword = [
  check('oldPassword', 'Please include a valid password').isLength({ min: 6}),
  check('newPassword', 'Please include a valid password').isLength({ min: 6}),
  check('repeatNewPassword', 'Please include a valid password').isLength({ min: 6})
]

router.put('/update-password', checkPassword, (req, res, next) => {
  const errors = validationResult(req)
  if(!errors.isEmpty())
    return res.status(422).json({ errors: errors.array() });
    try {
      
      updatePassword(req.body, req.user._id).then((user) => {
        return res.redirect('/api/users/profile');
      }).catch((err) => {
        req.flash('perrors', 'Unable to Update user');
        return res.redirect('/api/users/update-profile')});
    } catch (errors) {
      console.log(errors);
    }
});

module.exports = router;
