var http = require('http');
var fs = require('fs');

// Chargement du fichier index.html affiché au client
var server = http.createServer(function(req, res) {
    fs.readFile('./index.html', 'utf-8', function(error, content) {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(content);
    });
});

// Chargement de socket.io
var io = require('socket.io').listen(server);

// Quand un client se connecte, on le note dans la console
io.sockets.on('connection', function (socket) {
    console.log('Un client est connecté !');
	socket.emit('message', { content: 'You are logged in !', importance: '1' });
	
	
	 // Quand le serveur reçoit un signal de type "message" du client    
    socket.on('message', function (message) {
		console.log(message);
       
    });
	
})



server.listen(8080);