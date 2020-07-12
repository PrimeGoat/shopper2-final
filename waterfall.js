const { waterfall } = require('async');




// waterfall([
//     function(callback) {
//         callback(null, 7, 5);
//     },
//     function(arg1, arg2, callback) {

//         const newNum = arg1 + arg2;
//         // arg1 now equals 'one' and arg2 now equals 'two'
//         callback(null, newNum);
//     },
//     function(arg1, callback) {
//         // arg1 now equals 'three'
//         const res = arg1 * 10;
//         callback(null, res);
//     }
// ], function (err, result) {
//     if (err) return console.log(err);
//     console.log(result);
//     // result now equals 'done'
// });

const one = (callback) => {
    callback(null, 7, 5)
}

const two = (arg1, arg2, callback) => {
    const newNum = arg1 + arg2;
    callback(null, newNum);
}

const three = (arg1, callback) => {
    const res = arg1 * 10;
    callback(null, res);
}

const final = (err, result) => {
    if (err) return console.log(err);
    console.log(result);
    // result now equals 'done'
}

waterfall([one, two, three], final)