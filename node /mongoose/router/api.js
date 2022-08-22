const User = require('../models/userdetails');


module.exports = function (router) {

    router.get('/user', (req, res) => {
    //     // res.send('hello');

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
    });
    router.post('/user', (req, res) => {
        var user = new User();
        user.fname = req.body.fname;
        user.lname = req.body.lname;
        user.mobile = req.body.mobile;
        user.dob = req.body.dob;
        user.city = req.body.city;
        user.pincode = req.body.pincode;
        user.state = req.body.state;
        user.password = req.body.password;   
        user.email = req.body.email;
    })
    router.put('/user/:id', (req, res) => {
            User.findOne({ _id: req.params.id }, function (err, user) {
            if (err) throw err;
            if (!user) {
                res.json({ success: false, message: 'not user found' });
            }
            else {
                user.fname = req.body.fname;
                user.lname = req.body.lname;
                user.mobile = req.body.mobile;
                user.email = req.body.email;
                user.dob = req.body.dob;
                user.city = req.body.city;
                user.pincode = req.body.pincode;
                user.state = req.body.state;
                user.save();
                console.log('update');
            }
        })
    })
    router.delete('/user/:id', (req, res) => {
        User.findByIdAndRemove({ _id: req.params.id }, function (err, user) {
            if (err) throw err;
            if (!user) {
                console.log('user not found');
            }
            console.log('deleted');
        })
    })
    return router;

}
