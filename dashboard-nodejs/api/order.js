var order = require('../model/order');
var image = require('../middleware/multer');

module.exports = function (reg) {

    reg.get('/orders', (req, res) => {
        order.find({}, function (err, data) {
            if (err) throw err;
            if (!data) {
                res.json({success:false,message:'not found'})
            }else{
                res.json({success:true,message:data});
            }
        })
    })
    reg.post('/orders', image, (req, res) => {
        var regitem = new order();
        regitem.name = req.body.name;
        regitem.description = req.body.description;
        regitem.price = req.body.price;
        regitem.image = 'http://localhost:8000/'+req.file.filename;
        
        regitem.save(function (err) {
            if (err) {
                if (err.error != null) {
                    if (err.error.name) {
                        res.json({ status: 401, success: false, message: 'Required Name' });
                    } else if (err.error.description) {
                        res.json({ status: 401, success: false, message: 'required description' });
                    } else if (err.error.price) {
                        res.status(401).json({ success: false, message: 'required price' });
                    } else if (err.error.image) {
                        res.status(401).json({ success: false, message: 'image required' });
                    }

                } else {
                    res.json({ status: 401, success: false, message: err });
                }
            }
            else {
                res.json({ status: 200, success: true, message: 'Successfully Registered !' });
            }
        })
    })
    return reg
}