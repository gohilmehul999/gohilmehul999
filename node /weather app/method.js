const express = require('express');
const http = require('http');
const fs = require('fs');
const api = require('./api.json');
const { json } = require('express');
const { deepStrictEqual } = require('assert');
const app = express();
const port = 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const student = {

}

//get method
app.get('/', (req, res) => {
    res.json(api);
})
// post method
app.post('/', (req, res) => {
    
    const user = req.body;
    console.log("post method data is:");
    console.log(req.body);
    res.json(user);
    // student.push(user);
})
// put method
app.put('/:id', (req, res) => {
    // var id = req.params.id;
    // var jsondata = fs.readdirSync('api.json','utf-8');
    // var data = JSON.parse(jsondata);

    // data[id]["name"] = req.body.name,
    // data[id]["password"] = req.body.password

    // fs.writeFileSync('api.json',(JSON.stringify(data)));
    // res.json(data);
    console.log('put method')
    console.log(req.params.id);
    console.log(req.body);
})
// delete method
app.delete('/:id',(req,res)=>{
     const {id} = req.params;
     console.log(id)
    
})

app.listen(port, () => {
    console.log(`port working on ${port}`);
});
