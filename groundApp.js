/*
    Liam Brown
    02/23/2018

    groundApp.js is to initialize the link between the server and the ground station software, which is waiting on 
    port 14553 for data transmission with the drone. This will provide a more secure connection with the server as 
    the contents of the first message will be parsed for authentication. 
*/

var datagram = require('dgram');
var open = require('open');
var sleep = require('sleep');
var socket = datagram.createSocket('udp4');

serverPORT = 14000;
const PORT = 14553;
const serverIP = '52.14.152.228';
const message  = "LTEControlledDrone";

socket.bind(PORT);

socket.send(message,serverPORT,serverIP, function(err){
    if(err){
        console.log("Error sending to server.");
    }else{
        console.log("Packet successfully sent to server at:" + serverIP + ":" + serverPORT);
        sleep.sleep(1);
        console.log("Launching QGroundControl for flight management");
        sleep.sleep(1);
        open('/Users/liambrown/Desktop/QGroundControl.app', function(){
            console.log('Successfully launched QGroundControl, closing socket and shutting down...');
            sleep.sleep(2);
            socket.close();
            process.exit();
        });
    }
} )



