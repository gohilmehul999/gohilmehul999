var mongoose = require('mongoose');

var detail = new mongoose.Schema({
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    mobile: { type: String, required: true },
    email: { type: String, required: true },
    dob: { type: String, required: true },
    city: { type: String, required: true },
    pincode: { type: String, required: true },
    state: { type: String, required: true },
    password: { type: String, required: true },
    image : { type: String, required: true },
    image_path : { type: String, required: true }

})

module.exports = new mongoose.model("user_info", detail)