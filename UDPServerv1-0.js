/*
Liam Brown 
02/20/18

UDPServer v1.0 
    Test UDP connection from a local network to the internet. This server simply replies
    to the sender with a UDP packet. 
*/

var PORT = 2000;
var HOST = '127.0.0.1';

var datagram = require('dgram');
var server = datagram.createSocket('udp4');

while(1){}

server.on('listening', function() {
    var address = server.address();
    console.log('UDP listener instantiated and listening on ' + address.address + ":" + address.port );

});

server.on('message' , function(message, remote){
    console.log(remote.address + ':' + remote.port + '-' + message);
});

server.bind(PORT,HOST);



