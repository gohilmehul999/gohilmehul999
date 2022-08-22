const product = require('../model/profile');
var path = require("path");
const fs = require('fs');
require('mongodb');

var upload = require('../middware/upload');

module.exports = function (router) {
    // router.post('/upload', upload, (req, res) => {
    //     res.send('All Are Done.... File Successfully Uploaded')
    // });

    router.post('/upload', upload, (req, res) => {
        let user = new product();
        user.image = req.file.filename;
        user.image_path = 'http://localhost:8000/api/' + req.file.filename;
        user.save();
        res.send('insert file')
    })

    router.get('/upload', (req, res) => {
        // const data = fs.readdirSync('./upload', 'utf-8');
        product.find({}).then((user) => {
            res.send(user);
        }).catch((err) => {
            res.status(500).send(err);
        });
    });

    router.put('/upload/:id', upload, (req, res) => {
        product.findOne({ _id: req.params.id }, function (err, data) {
            console.log(data)
            if (err) throw err;
            if (!data) {
                res.json({ success: false, message: 'not user found' });
            }
            else {      
                fs.unlinkSync(`./upload/${data.image}`);
                data.image = req.file.filename;
                data.image_path = 'http://localhost:8000/api/' + req.file.filename;
                console.log(data.image);
                console.log(data.image_path);
                data.save();
                res.send('updates')
            }
        })
    })

    router.delete('/upload/:id', (req, res) => {
        product.findByIdAndRemove({ _id: req.params.id }, function (err, data) {
            console.log(data);
            if (err) throw err;
            if (!data) {
                res.json({ success: false, message: "Data Not Found" });
            }
            else {
                fs.unlinkSync(`./upload/${data.image}`);
                console.log('File Deleted');
                res.send('Deleted');
            }
        })
    })
    return router;
}