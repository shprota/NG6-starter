const io = require('socket.io').listen(8080);
const http = require('http');

io.sockets.on('connection', function (socket) {
        // nothing currently
  console.log("Connection accepted");
    });

http.createServer(function (req, res) {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('Reloading clients\n');

        io.sockets.emit('reload', {});

    }).listen(1337);

console.log('Server running at http://HOSTNAME:1337/');
