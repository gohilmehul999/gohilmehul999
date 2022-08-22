const http = require('http');
const fs = require('fs');
// var request = require('requast');


const server= http.createServer((req,res)=>{
// c console.loonst json = fs.readFileSync('./api.json','utf-8');
//g(res.end(json));
 
const homefile = fs.readFileSync('./home.html','utf-8');
res.end(homefile);

})
server.listen(8080);



