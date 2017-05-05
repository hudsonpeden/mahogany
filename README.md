Mahogany

This application has this structure:

React front end
		|
		|	
Node.js Server
		|
		|
Raspberry Pi Node.js server

The control application is hosted on Heroku. The raspberry pi monitors the temperature of the system and adjust the relays accordingly. 


The heroku app contains two main folders: Client and Server.

Client holds the files for the front end web interface. 

Server holds the files for the main Node.js server

The raspberry pi app code is contained in the folder: pifiles.
	The preferred way to connect to the raspberry pi is using SSH. You can do this on UNIX (mac or linux) from the terminal or on windows using PuTTY.

	Filezilla makes it easy to use SFTP to easily view the file structure of the raspberry pi. 


If you have any questions, you can contact me at hudsonpeden@gmail.com