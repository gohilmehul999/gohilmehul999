const express = require('express')
const app = express()
const port = 3030
const router = express.Router();
const appRouter = require('./router/api.js')(router)
var bodyParser = require('body-parser');
var morgan = require('morgan')

const { default: mongoose } = require('mongoose');

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use('/api', appRouter);
var cors = require('cors');

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
})

mongoose.connect('mongodb://localhost:27017/practice_mydb');
var conn = mongoose.connection;

conn.on('connected', function () {
    console.log('connected with database');
})

conn.on('disconnected', function () {
    console.log('disconnected database');
})
conn.on('error', console.error.bind(console, 'connection error:'));

app.listen(port, () => console.log(`listening on port ${port}!`))