const app = require('express')()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);

server.listen(3012);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

const clientio  = require('socket.io-client');
const client    = clientio.connect('https://mahogany.herokuapp.com/' || 'http://192.168.2.18');

const data = {
	response: 'hello from rpi'
};

io.sockets.on('connection', function (socket) {
  socket.on('client', function(data) {
    console.log('clientserver data', data);
    client.emit('my event', data);
  });
});