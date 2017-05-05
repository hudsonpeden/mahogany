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


API
-------------------------------------------------------------------------
This app doesn't have an API per se, but I will explain what each of the components do.
	(Components are the React Javascript Classes)

client/index.js : calls the ReactDOM to render the application on the browser

client/App.js : the main parent class of the application. Renders the Navbar component 					and the AppBody component

client/components/app-body.js : Renders the child components Overview, Controls, and 									System Data. Also handles client-side socket.io 										connections

client/components/controls.js : uses a form to allow the user to update the set 										temperatures of the system

client/components/navbar.js : renders the navbar at the top of the application

client/components/overview.js : shows the average temperature above and below ground. 									Displays the tempcache (average temps for last 5 										readings) in graphical form using React sparklines

client/components/system-data.js : shows the current values of each of the temp sensors 								   and the relays

