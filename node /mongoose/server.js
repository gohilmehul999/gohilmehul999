const express = require('express');
const app = express();
const mongoose = require('mongoose');
var router = express.Router();
const approut = require('./router/api')(router);
var cors = require('cors');
var bodyParser = require('body-parser');
var morgan = require("morgan");

app.use(cors({ origin: "*" }));
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
// app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api', approut);


const url = "mongodb://localhost:27017/mydb";
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const conn = mongoose.connection;

conn.on('connected', function () {
    console.log('successfully connected');
    conn.on('disconnected', function () {
        console.log("Successfully disconnected to MongoDB !!!");
    });
    conn.on('error', console.error.bind(console, 'connection error:'));

})

app.listen('8080', function () {
    console.log('port listen 8080');

})
