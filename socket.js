var http = require('http');
var fs = require('fs');

var server = http.createServer(function(req, res) {
	fs.readFile('./index_socket.html', 'utf-8', function(error, content) {
		res.writeHead(200, {"content-type":"text/html"});
		res.end(content);
	});
});

var io = require('socket.io').listen(server);

io.sockets.on('connection', function(socket, username) {
	// when client connects, they are sent message
	socket.emit('message', 'You are connected!');
	// the other clients are told thet someone new has arrived
	socket.broadcast.emit('message', 'Another client has just connected!');
	
	socket.on('add_username', function(username) {
		socket.username = username;
	});
	
	socket.on('message', function(message) {
		socket.broadcast.emit('message', message);
	});
});

server.listen(8080);