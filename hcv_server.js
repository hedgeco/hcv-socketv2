var http = require('http').createServer(handler),
	io   = require('socket.io').listen(http).set('log level', 1);
 
http.listen(8080);
console.log('HCV Server  listening on port 8080');
 
var nicknames = {};
 
function handler(req, res) {
  res.writeHead(200);
  res.end();
}
 
io.sockets.on('connection', function (socket) {
  socket.on('user message', function (msg) {
    socket.broadcast.emit('user message', socket.nickname, msg);
  });
 
  socket.on('nickname', function (nick, fn) {
    var i = 1;
    var orignick = nick;
    while (nicknames[nick]) {
      nick = orignick+i;
      i++;
    }
    fn(nick);
    nicknames[nick] = socket.nickname = nick;
    socket.broadcast.emit('announcement', nick + ' connected');
    io.sockets.emit('nicknames', nicknames);
  });
 
  socket.on('disconnect', function () {
    if (!socket.nickname) return;
 
    delete nicknames[socket.nickname];
    socket.broadcast.emit('announcement', socket.nickname + ' disconnected');
    socket.broadcast.emit('nicknames', nicknames);
  });
 
});