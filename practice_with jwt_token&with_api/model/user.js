const { default: mongoose } = require("mongoose");
var validate = require('mongoose-validator');
var bcrypt = require('bcrypt-nodejs');

var schema = mongoose.Schema;

var emailvalidate = [
    validate({
        validator: 'matches',
        arguments: /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/,
        message: "Email must be at least 3 characters, max 40, no special characters or numbers, must have space in between name."
    }),
    validate({
        validator: 'isLength', arguments: [4, 40], message: 'Value should be between 4 and 40 characters'
    })
]
var passwordvalidate = [
    validate({
        validator: 'matches',
        arguments: /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/,
        message: "Password needs to have at least one lower case, one uppercase, one number, one special character, and must be at least 8 characters but no more than 35."
    }),
    validate(
        { validator: 'isLength', arguments: [8, 35], passIfEmpty: true, message: 'Password should be between {ARGS[0]} and {ARGS[1]} characters' }
    )]

var userschema = new schema({
    email: { type: String, required: true, validate: emailvalidate },
    password: { type: String, required: true, validate: passwordvalidate }
})

//password encrypt
userschema.pre('save', function (next) {
    var user = this;
    if (!user.isModified('password')) return next();
    bcrypt.hash(user.password, null, null, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
    })
})


userschema.methods.comparepassword = function (password) {
return bcrypt.compareSync(password,user.password);
}

module.exports = mongoose.model('user', userschema)