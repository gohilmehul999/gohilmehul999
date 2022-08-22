const express = require('express');
const path = require('path');
const app = express();
const port = 8000;


const staticpath = path.join(__dirname,"../weather app/public");
app.use(express.static(staticpath));


app.get('/', (req, res) => {
    res.write(`<h1>hello home user</h1>`);
    res.send();
});
app.get('/about', (req, res) => {
    res.write(`<h1>hello about user</h1>`);
    res.send();
});
app.get('/contact', (req, res) => {
    res.write(`<h1>hello contact user</h1>`);
    res.send();
});
app.get('/temp', (req, res) => { 
    res.json({
        id:1,
        name:"mehul",
    });
});


app.listen(port, () => {
    console.log(`listing to the port number ${port}`);
});