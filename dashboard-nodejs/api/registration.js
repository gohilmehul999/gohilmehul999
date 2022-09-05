var registration = require('../model/userdata');

module.exports = function (reg) {
    reg.get('/', (req, res) => {
        // console.log('hi');
    })
    reg.post('/registration', (req, res) => {
        var reg = new registration();
        reg.username = req.body.username;
        reg.email = req.body.email;
        reg.password = req.body.password;
        reg.save(function (err) {
            if (err) {
                if (err.error != null) {
                    if (err.error.username) {
                        res.json({ status: 401, success: false, message: 'Required minimum digits 3 of First Name' });
                    } else if(err.error.email){
                        res.json({ status:401,success: false, message: 'pls enter valid email address' });
                    }else if(err.error.password){
                        res.status(401).json({ success: false, message: 'pls enter valid password' });
                    }
                }else{
                    res.json({ status:401,success: false, message: 'err' });
                }
            }
            else{
                res.json({ status:200,success: true, message: 'Successfully Registered !' });
            }
        })
    })
    return reg
}