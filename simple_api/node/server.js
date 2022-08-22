const express = require("express")
const app = express()
var mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path')
var router = express.Router();
const approute = require('./api/api')(router);
var morgan = require("morgan");


app.use(cors({ origin: "http://localhost:4200" }));
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
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', approute);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var PORT = process.env.port || 8080
app.use(morgan('dev'));
app.use(express.static('./image_upload'));

//mongoose database connection
const url = 'mongodb://localhost:27017/mydb';
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var conn = mongoose.connection;

conn.on('connected', function () {
    console.log('successfully connected');
});

conn.on('disconnected', function () {
    console.log("disconnected to MongoDB !!!");
});

conn.on('error', console.error.bind(console, 'connection error:'));

app.listen(PORT, function (error) {
    if (error) throw error
    console.log(" Server created Successfully on PORT " + PORT)
})
