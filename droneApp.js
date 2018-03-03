/*
    Liam Brown
    03/03/2018

    droneApp.js is to initialize the link between the server and the ground station software, which is waiting on 
    port 14553 for data transmission with the drone. This initially connects to the server to identify the IP address
    and port of the drone, once that is complete UDP hole punching is used to establish a connection.
*/

var datagram = require('dgram');
var open = require('open');
var sleep = require('sleep');
var socket = datagram.createSocket('udp4');

const serverPORT = 14001;
const serverIP = '18.222.93.70';
const message  = "LTEControlledDrone";


var groundReady = false;
var numSent = 0;


if(!groundReady){
socket.send(message,serverPORT,serverIP, function(err){
    if(err){
        console.log("Error sending to server.");
    }else{
        console.log("Packet successfully sent to server at:" + serverIP + ":" + serverPORT);
    }
});
}

if(numSent <1){
socket.on('message', function(message, remote){
    console.log("Message received from: " + remote.address + ":" + remote.port +  "-" + message);
    var groundAddress = message.toString();
    var splitAddress = groundAddress.split(":");
    groundIP = splitAddress[0];
    groundPORT = splitAddress[1];



    console.log(droneIP + "-" + dronePORT);

    socket.send(message,groundPORT,groundIP, function(err){
        if(err){
            console.log("Error sending to ground.");
        }else{
            console.log("Packet successfully sent to ground station at:" + groundIP + ":" + groundPORT);
            numSent++;
            sleep.sleep(1);
            console.log('Successfully sent packet to ground station, closing socket and shutting down...');
            sleep.sleep(2);
            socket.close();
            process.exit();
        }
    } )


});
}
