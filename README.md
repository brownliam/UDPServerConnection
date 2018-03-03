# UDPServerConnection
Node.js UDP communications system that acts as a relay server to pass messages through the web from a ground station to a drone. 

v1.0 - Simple UDP server that relays recieved messages to the server console.

v1.1 - UDP server that logs messages to the console and responds to the sender. 

v1.2 - UDP server that handles the flow of data from a ground station device to a UAV device and back. 

v1.3 - UDP server that handles the transfer of sender's IP's and ports to enable UDP hole punching.

groundApp.js serves to initialize the connection to the server from the ground station and open the ground station software. 

droneApp.js serves to initialize the connection from the drone to the ground station software, through the server.

UDPDeviceTest.java serves as an arbitrary udp device on the network, it sends a packet to the specified address on the specified port and waits for a response on that port. Used for testing over local and wide networks. 


