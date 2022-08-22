// import libraries
const express = require('express');
const app = express();
const cors = require('cors')
const port = 8000;
const mongoose = require('mongoose');
var router = express.Router();
var bodyParser = require('body-parser');
var approuter = require('./api/api')(router);

// use
app.use(cors({ origin: "*" }));
app.use('/api', approuter);
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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api', express.static('./upload'));

// mongoose database connection
const url = "mongodb://localhost:27017/mydb";
mongoose.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true})
var conn = mongoose.connection;

conn.on('connected',function(){
    console.log('connection successfully')
})
conn.on('disconnected',function(){
    console.log(" disconnected !!!");
})
conn.on('error', console.error.bind(console, 'connection error:'));

// express port listen
app.listen(port, function(){
    console.log('port are running'+ port)
})
