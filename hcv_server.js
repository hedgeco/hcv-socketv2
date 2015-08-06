var http = require('http').createServer(handler)
 
http.listen(8080);
console.log('HCV Server listening on port 8080');
 
function handler(req, res) {
  res.writeHead(200);
  res.end('HCV Socket Server');
}