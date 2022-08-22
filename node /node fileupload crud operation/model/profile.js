var mongoose = require('mongoose');
var schema = mongoose.Schema;

var fileuploadcontrol = new schema({
    image : { type: String, required: true },
    image_path : { type: String, required: true }
});
module.exports = mongoose.model('productdetail',fileuploadcontrol);