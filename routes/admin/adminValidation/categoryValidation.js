const { validationResult } = require('express-validator');


    
const categoryValidation = function(req, res, next) {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // console.log(errors.errors);
        // return res.status(422).json({ err: errors.array() });
        req.flash('errors', errors.errors[0].msg);
        return res.redirect('/api/admin/add-category');
    }
    next()
}

module.exports = { categoryValidation}