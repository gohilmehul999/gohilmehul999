var mongoose = require('mongoose');

var order = new mongoose.Schema({
    name: { type: String, require: true },
    price: { type: String, require: true },
    description: { type: String, require: true },
    price: { type: String, require: true },
    image: { type: String, require: true },
});

module.exports = mongoose.model('returant_menu',order);
