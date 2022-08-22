var mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require("express")
const path = require('path')
const app = express()
var router = express.Router();
const approute = require('./api/api')(router);
var morgan = require("morgan");

// Body-parser middleware
app.use(bodyParser.urlencoded({ extended:false}));
app.use(bodyParser.json());
// process in environments use port
var PORT = process.env.port || 3000
// cors
app.use(cors({ origin: '*' }))
//header
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
app.use(morgan('dev'));

// path static
app.use(express.static('./image_upload'));

// View Engine Setup
app.set("views", path.join(__dirname))
app.set("view engine", "ejs")

//api routeapp use
app.use('/api', approute);

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
    console.log(" Server created Successfully on PORT ", PORT)
})
