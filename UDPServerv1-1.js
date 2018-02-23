/*
Liam Brown 
02/22/18

UDPServer v1.1
    Test UDP connection from a local network to the internet. This server simply replies
    to the sender with a UDP packet mirroring what was sent. Does not handle packet loss.
*/

var datagram = require('dgram');

const groundIncomingPORT = 14000;  // Port listening for data coming from the gorund station
const droneIncomingPORT = 14001; 


var groundServer = datagram.createSocket('udp4');


groundServer.on('listening', function() {
    var address = groundServer.address();
    console.log('UDP ground station listener instantiated and listening on ' + address.address + ":" + address.port );

});


//On recieving a message the system will mirror that message back to the sender which is listening on groundPort.
groundServer.on('message' , function(message, remote){
    console.log("UDP ground station listener received message from: " + remote.address + ':' + remote.port + '-' + message);
    groundServer.send(message, remote.port, remote.address, function() {
        console.log("Message sent to ground station at: " + remote.address + ":" + remote.port);
    });
});

groundServer.bind(groundIncomingPORT);
