const User = require('../model/userdetail/userschema');
const fs = require('fs');
const multer = require('multer');
var path = require("path");
require('mongodb');

var upload = require('../middleware/middleware_multer');

module.exports = function (router) {
    router.get('/user', (req, res) => {
        // res.send('hello');
        User.find({}).then((user) => {
            res.send(user);
        }).catch((err) => {
            res.status(500).send(err);
        })
    })

    router.get('/user/:id', (req, res) => {
        User.findById(req.params.id, function (err, doc) {
            res.send(doc);
        });
    })

    router.post('/user', upload, (req, res) => {
        let user = new User();
        console.log("req", req.file);
        user.fname = req.body.fname;
        user.lname = req.body.lname;
        user.mobile = req.body.mobile;
        user.dob = req.body.dob;
        user.city = req.body.city;
        user.pincode = req.body.pincode;
        user.state = req.body.state;
        user.password = req.body.password;
        user.email = req.body.email;
        user.image = req.file.filename;
        user.image_path = 'http://localhost:4201/api/' + req.file.filename;
        user.save();
        res.send('insert file');

    })

    router.put('/user/:id', upload, (req, res) => {
        User.findOne({ _id: req.params.id }, function (err, data) {
            console.log(data)
            if (err) throw err;
            if (!data) {
                res.json({ success: false, message: 'not user found' });
            }
            else {
                if (!req.file) {
                    data.fname = req.body.fname;
                    data.lname = req.body.lname;
                    data.mobile = req.body.mobile;
                    data.dob = req.body.dob;
                    data.city = req.body.city;
                    data.pincode = req.body.pincode;
                    data.state = req.body.state;
                    data.password = req.body.password;
                    data.email = req.body.email;
                    data.save();
                    res.send('updates')
                }
                else {
                    fs.unlinkSync(`./image_upload/${data.image}`);
                    data.fname = req.body.fname;
                    data.lname = req.body.lname;
                    data.mobile = req.body.mobile;
                    data.dob = req.body.dob;
                    data.city = req.body.city;
                    data.pincode = req.body.pincode;
                    data.state = req.body.state;
                    data.password = req.body.password;
                    data.email = req.body.email;
                    data.image = req.file.filename;
                    data.image_path = 'http://localhost:4201/api/' + req.file.filename;
                    console.log(data.image);
                    console.log(data.image_path);
                    data.save();
                    res.send('updates')
                }
            }
        })
    })

    router.delete('/user/:id', (req, res) => {
        User.findByIdAndRemove({ _id: req.params.id }, function (err, data) {
            if (err) throw err;
            if (!data) {
                console.log('information not found');
            }
            fs.unlinkSync(`./image_upload/${data.image}`);
            console.log('deleted');
            res.send('Deleted');
        });
    })
    return router;
}