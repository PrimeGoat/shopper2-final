const { check, validationResult } = require('express-validator');

const loginValidation = [
    check('email', 'Please enter email').isEmail(),
    check('password', 'Please include a valid password').isLength({min:6})
  ];

const loginVerify = function(req, res, next) {
    const info = validationResult(req);
    if(!info.isEmpty()) {
        req.flash('errors', 'Invalid Email or Password');
        return res.redirect('/api/users/login');
    }
    next();
}

module.exports = {loginValidation, loginVerify }

// module_exports = { 
//     // loginValidation: [
//     //     check('email', 'Please enter email').isEmail(),
//     //     check('password', 'Please include a valid password').isLength({min:6})
//     //   ],
//       loginVerify: (req, res, next) => {
//         const loginValidation = [
//             check('email', 'Please enter email').isEmail(),
//             check('password', 'Please include a valid password').isLength({min:6})
//           ];
//         const info = validationResult(req);
//         if(!info.isEmpty()) {
//             req.flash('errors', 'Invalid Email or Password');
//             return res.redirect('/api/users/login');
//         }
//         next();
//     }
    
//  }