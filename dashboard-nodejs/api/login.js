var login = require('../model/userdata');
var jwt = require('jsonwebtoken');
var secret = 'gohilmehul';

module.exports = function (router) {
    router.post('/login', (req, res) => {
        login.findOne({ email: req.body.email }).select('email password').exec(function (err, data) {
            if (err) throw err
            else {
                console.log('this is login data', data);
                if (!data) {
                    res.json({ status: 401, success: false, message: 'email & password combination was wrong' })
                } else if (data) {
                    if (!req.body.password) {
                        res.json({ status: 401, success: false, message: 'No password provided' });
                    }
                    else {
                        var validPassword = data.comparePassword(req.body.password);
                        if (!validPassword) {
                            res.json({ status: 400, success: false, message: 'Could not authenticate password' });
                        } else {
                            // res.send(data);
                            var token = jwt.sign({ email: data.email, id: data._id }, secret, { expiresIn: '24h' });
                            res.json({ status: 200, success: true, message: 'user authenticated!', token: token });
                        }
                    }
                }
            }
        })
    })

    router.use(function (req, res, next) {

        var token = req.body.token || req.body.query || req.headers['x-access-token'];
        if (token) {
            jwt.verify(token, secret, function (err, decoded) {
                if (err) {
                    res.status(401).json({ success: false, message: 'Token invalid' });
                } else {
                    console.log("ufghfgh", decoded);
                    req.decoded = decoded;

                    next();
                }
            });
        } else {
            res.status(401).json({ success: false, message: 'No token provided' });
        }
    });

    router.get('/profile', (req, res) => {
        login.findOne({ email:req.decoded.email }, function (err, user) {
            if (err) throw err;
            if (!user) {
                res.json({ success: false, message: 'not found' })
            } else {
                res.json({success: true, message: user})
            }
        })
    })




    return router;
}