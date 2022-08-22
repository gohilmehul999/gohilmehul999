var User = require('../model/user');
const multer = require("multer");
const user = require('../model/user');
var upload = multer();
var jwt = require('jsonwebtoken');
var secret = 'harrywithmehul'
module.exports = function (router) {

    router.get('/', (req, res) => {
        // var token = jwt.sign({ email: user.email, id: user._id }, secret, { expiresIn: '24h' });
        // res.json({ success: true, message: 'User authenticated!', token: token });
        // res.send('Hello World!')


        //try --catch error handling 
        try {
            res.status(200).json({ success: true, message: 'User authenticated!', token: token });
        }
        catch (e) {
            // res.status(500).json({ success: false, message: 'Unprocessable Entity' }) 
            res.status(500).json({})
        }




    })
    router.post('/post', upload.single('file'), (req, res, next) => {
        var user = new User();
        user.email = req.body.email,
            user.password = req.body.password
        user.save(function (err) {
            console.log(req.body);
            if (err) {
                if (err.errors != null) {
                    if (err.errors.email) {
                        res.status(401).json({ success: false, message: 'Not proper email address' });
                    } else if (err.errors.password) {
                        res.status(401).json({ success: false, message: 'use strong password' });
                    }
                }
                else {
                    res.status(401).json({ success: false, message: err })
                }
                // var validatepass = user.comparepassword(req.body.password)
            } else {
                res.status(200).json({ success: true, message: 'posted' })
            }
        })
    }
    )
    return router;
}