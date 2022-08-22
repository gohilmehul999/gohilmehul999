const express = require('express');
const app = express();
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
var router = express.Router();
const fs = require('fs');   
const cors = require('cors');
const port = 4201;
const approut = require('./api/api')(router);

app.use(cors({ origin: "*" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api', approut);
app.use('/api', express.static('./image_upload'));

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

app.listen(port, function (){
    console.log('port:',port);
})