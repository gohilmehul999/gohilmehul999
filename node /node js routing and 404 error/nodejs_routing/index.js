const http = require('http');
const fs = require('fs');



const server = http.createServer((req, res) => {

    const data = fs.readFileSync(`${__dirname}/userapi.json`, "utf-8",);
     const dataarray = JSON.parse(data)
    if (req.url == "/") {
        res.end('home');
    } else if (req.url == "/about") {
        res.end('about');
    }
    else if (req.url == '/contact') {
        res.end('contact')
    }
    else if (req.url == '/userapi') {
    // res.end(data)
    res.writeHead(200);
    // console.log(dataarray[1])
    res.end(dataarray[1]);
    }
    else {
        res.writeHead(404)
        res.end(`<html><head><style>img{width:100%;height:100%;}</style></head><body><img src='https://internetdevels.com/sites/default/files/public/blog_preview/404_page_cover.jpg' alt='not show image'></body></html>`)
    }
})
server.listen(8080)
