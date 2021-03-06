/*
Liam Brown 
02/23/18

UDPServer v1.2
    Test the UDP connection for data flow from device A (ground station) through the server to device B (Drone). 
    This version assumes that both devices are on the same LAN for now, and therefore the same IP will be used with different
    ports for testing. 
    As to utilize the "UDP hole punching" technique, each device will have to send an initial message to enable the 
    flow of data through the server to that device. 
    This also has a brief setup for data transfer to and from each device. 
*/

var datagram = require('dgram');

const groundIncomingPORT = 14000;  // Port listening for data coming from the gorund station
const droneIncomingPORT = 14001;


var groundLinkReady = false; //Boolean to see if ground station device has already linked up with the server. 
var droneLinkReady = false // Check if drone ready. 

var groundIP;
var droneIP;
var groundPort;
var dronePort;

var groundServer = datagram.createSocket('udp4');
var droneServer = datagram.createSocket('udp4');

//Handle the initialization of each listener, for the drone and ground station. 
groundServer.on('listening', function() {
    var address = groundServer.address();
    console.log('UDP ground station listener instantiated and listening on ' + address.address + ":" + address.port );

});

droneServer.on('listening', function() {
    var address = droneServer.address();
    console.log('UDP drone listener instantiated and listening on' + address.address + ":" + address.port);
});


//On receiving a message from the ground station the ground server will forward the message to the drone at its address. 
groundServer.on('message' , function(message, remote){
    console.log("UDP ground station listener received message from: " + remote.address + ':' + remote.port + '-' + message);
    groundIP = remote.address;
    groundPort = remote.port;
    groundLinkReady = true;
    if(droneLinkReady == true){
    droneServer.send(message, dronePort, droneIP, function() {
        console.log("Message forwarded to drone at: " + droneIP + ":" + dronePort);
    });
}   else{
    console.log("Unable to send to dron as no message has been received from the drone.")
}
});

//On receiving a message from the drone the system will check to see if it is able to send to the ground station address 
//before sending to the ground station. 

droneServer.on('message' , function(message, remote){
    console.log("UDP drone listener received message from: " + remote.address + ':' + remote.port + '-' + message);
    droneIP = remote.address;
    dronePort = remote.port;
    droneLinkReady = true;
    if(groundLinkReady == true){
    groundServer.send(message, groundPort, groundIP, function() {
        console.log("Message forwarded to ground station at: " + groundIP + ":" + groundPort);
    });
}  else{
    console.log("Unable to send to ground station as no message has been received from sender.")
}
});

groundServer.bind(groundIncomingPORT);
droneServer.bind(droneIncomingPORT);
