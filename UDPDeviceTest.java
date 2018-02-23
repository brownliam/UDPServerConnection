import java.net.*;
import java.io.*;
import java.util.Scanner;

/*
	UDP sender/receiver to act as either the ground station or the drone. 
	This class just handles user input to generate and send messages to the inputted IP address and then await a response. 
	Once a response has been recieved the message will be displayed to the console and the user will be prompted for 
	more input. 
*/

public class UDPSender {



	public static void main(String[] args) 
   {
	      // Check the arguments
	      if( args.length != 2 )
	      {
	         System.out.println( "usage: java UDPSender host port" ) ;
	         return ;
	      }
	      DatagramSocket socket = null ;
	      try
	      {
	         // Convert the arguments first, to ensure that they are valid
	         InetAddress host = InetAddress.getByName( args[0] ) ;
	         int port         = Integer.parseInt( args[1] ) ;
	         socket = new DatagramSocket() ;
     
	         Scanner in;
	         in = new Scanner (System.in);
	         String message = null;
              int z = 0;
	         while (true)
	         {
	        		 System.out.println("Enter text to be sent, ENTER to quit ");
	        		 message = in.nextLine();
	        		 if (message.length()==0) break;
	        		 byte [] data = message.getBytes() ;
	        		 DatagramPacket packet = new DatagramPacket( data, data.length, host, port ) ;
	        		 socket.send( packet ) ;
                 z++;
                 


				 
                 //Receive
                 
				    System.out.println("Waiting to revceive packet on port: " + socket.getLocalPort());
                    byte recData[] = new byte[100];
                    DatagramPacket recPacket = new DatagramPacket(recData,recData.length);
				 try{
			       		 socket.receive(recPacket);
				 } catch(IOException e){
					e.printStackTrace();
					System.exit(1);
				 }
				
				 String received = new String(recData,0,recPacket.getLength());
                     System.out.println("Message recieved from: " + recPacket.getAddress() + ":" + recPacket.getPort() + "-" + received);
                     
                 
				 
				 	
                 
	         } 
	         System.out.println ("Closing down");
	      }
	      catch( Exception e )
	      {
	         System.out.println( e ) ;
	      }
	      finally
	      {
	         if( socket != null )
	            socket.close() ;
      }
   }
}

