// This shit is needed for OpenShift. They set environment variables in their magic system
// that can be picked up by the app and configured automatically. USE THEM!
// I grabbed this from: https://developers.openshift.com/en/node-js-project-structure.html
//  
var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8888 // 8888 was my original port
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0' // 0.0.0.0 was my original ip. 127.0.0.1 also should work

// Start of my code:
var net = require('net');

var server = net.createServer(function (socket) {
//  socket.write("Echo server\r\n");
//  socket.pipe(socket);
  socket.setEncoding('utf8');
  //console.log("Client connected!");
  //socket.on('connect', function () {
    //console.log('update connect from: ' + socket.remoteAddress);
    //socket.end();
  //});
  socket.on('data', function (data) {
    //console.log(data);
    console.log(socket.remoteAddress + ": " + data);
    socket.write('Hi! Now go away.\r\n');
    //socket.end('bye!');
  });
  socket.on('end', function () {
    //console.log('connection ended');
    //socket.end();
  });
});

// I had these lines before I moved this to OpenShift...
// I just had to swap out the values from the top of this file
server.listen(server_port, server_ip_address);
console.log('Listening on '+server_ip_address+', port '+server_port+'...');
