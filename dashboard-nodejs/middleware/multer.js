var multer = require('multer');

const image = multer({
    storage :multer.diskStorage({
        destination:function(req,file,cb){
            cb(null,'./middleware/item_images');
        },
        filename:function(req,file,cb){
            if(!file.originalname.match(/\.(png|jpg|jpeg)$/)){
                var err = new error();
                err.code= 'only png,jpg & jpeg image uploaded';
                return cb(err.code);
            }else{
                cb(null, file.fieldname + "-" + Date.now() + '.jpg')
            }
        }
    })
}).single('images');
module.exports = image;