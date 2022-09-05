var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var schemaa = mongoose.Schema;
var userdata = new schemaa({
    //schema frield
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }

});

// password encrypt algorithm
userdata.pre("save", function (next) {
    var user = this;
    if (!user.isModified('password')) return next();
    bcrypt.hash(user.password, null, null, function (err, hash) {
        if (err) {
            return next(err);
        }
        user.password = hash;
        next();
    })
})

// password decrypt algorithm
userdata.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('userdata', userdata);

