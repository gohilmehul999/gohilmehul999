const multer = require('multer');

const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'upload')
        },
        filename: function (req, file, cb) {
            if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
                var err = new Error();
                err.code = 'check file type';
                return cb(err);
            } else {
                cb(null, file.fieldname + "-" + Date.now() + '.jpg')
               
            }
        }   
    })
}).single("user_file");
module.exports = upload;