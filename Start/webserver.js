/**
* Created by jusk2 on 2016-12-26.
*/

const http = require('http');

const hostname = '127.0.0.1';
const port = 5000;
/*
http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
res.end('Hello World\n');

}).listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
*/
// 비동기식
var server = http.createServer(function (req, res) {

});
server.listen(port, hostname, function () {
    console.log(`Server running at http://${hostname}:${port}/`);
});
