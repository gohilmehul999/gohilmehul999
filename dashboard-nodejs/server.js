var express = require('express');
var morgan = require('morgan');
var app = express();
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var cors = require('cors');
var router = express.Router();
var reg = express.Router();
var order = express.Router();
var PORT = process.env.port || 8000
var approutelogin = require('./api/login')(router);
var approuteorder = require('./api/order')(order);
var approuteregister = require('./api/registration')(reg)

// app.use(cors({ origin: "http://localhost:4200" }));
app.use(cors({ origin: '*' }));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token, x-refresh-token, _id");

    res.header(
        'Access-Control-Expose-Headers',
        'x-access-token, x-refresh-token'
    );

    next();
});
app.use(express.static('./middleware/item_images'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use('/api', approuteorder);
app.use('/api', approutelogin);
app.use('/api', approuteregister);
// app.use(cors({ origin: "http://localhost:4200"   }));
app.use(morgan('dev'));

const url = 'mongodb://localhost:27017/order_dashboard';
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var conn = mongoose.connection

conn.on('connected', () => {
    console.log('connected');
})
conn.on('disconnected', () => {
    console.log('connected');
})
conn.on('error', console.error.bind(console, 'connection error:'));

app.listen(PORT, function (error) {
    if (error) throw error
    console.log(" Server created Successfully on PORT " + PORT)
})