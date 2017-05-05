
const app = require('express')();
const sensor = require('ds18x20');
const server = app.listen(3012, () => console.log('server running on port 3012')); //require('http').createServer(app)
//const io = require('socket.io')(server);
const io  = require('socket.io-client');
//'https://mahogany.herokuapp.com/' || 
//'http://192.168.2.18:3001'

// establish connection to heroku
const socket = io('https://mahogany.herokuapp.com/');
// map relays to RPi pins
const Gpio = require('onoff').Gpio, 
	relay1 = new Gpio(17, 'low'),
	relay2 = new Gpio(25, 'low');

// tempCaches store the last 5 temperature values 
const tempCacheA = [];
const tempCacheB = [];
let avgTempA = 0.0;
let avgTempB = 0.0;

//default configuration parameters
let controlState = {
	setTempA: 50,
	setTempB: 50,
};

// this function grabs the state of the relays and sends them to the server
function getRelayState () {
	relayState = [relay1.readSync(), relay2.readSync()];
	socket.emit('piRelayValue', relayState);
}
 

/*
*---------------SOCKET EVENTS-----------------*	
*/

console.log('getting ready');
socket.on('connect', () => {
  console.log(socket.id); // 'G5p5...'

});

// if there is an error with the socket.io connection, log it to the console
socket.on('connect_error', (error) => {
	console.log(error);
});

// listen for the client to request the state of the relays
socket.on('sendRelayRequest', () => {
	getRelayState();
});

// listen for the client to request of the control state
socket.on('sendControlRequest', () => {
	console.log('control state requested');
	socket.emit('piControlValue', controlState);
});

// update the controls of the application
socket.on('updatedControls', (val) => {
	console.log(val);
	controlState = {
		setTempA: val.setTempA,
		setTempB: val.setTempB,
	};
	console.log(controlState);
});

// check to see if DS18B20 sensors are loaded
// returns TRUE/FALSE
sensor.isDriverLoaded((err, isLoaded) => {
	console.log(isLoaded);
	if (err) {
		//if driver is not loaded run loadDriver ** Need to be root **
		sensor.loadDriver((err) => {
			if (err) console.log('Error loading driver: ', err);
			else console.log('driver is loaded');
		});
	}

	//list available sensors
	sensor.list((err, listOfDeviceIds) => {
		console.log(listOfDeviceIds);
	});

	// every 20 seconds, get the temperatures of the sensors
	const tid = setInterval(getTemps, 20000);
	
	function getTemps() {
		temps = {
			s1: 0,
			s2: 0,
			s3: 0
		}
		//get temps from all available sensors		
		sensor.getAll((err, tempObj) => {
			temps = {
				s1: tempObj['28-0316649db1ff'],
				s2: tempObj['28-04166354d1ff'],
				s3: tempObj['28-041663eff5ff']
			}
			console.log(temps);
			socket.emit('tempUpdate', temps);
			
			// add temps to tempCache
			tempCacheA.push((temps.s1)*(9/5)+32);
			tempCacheB.push(((temps.s2 + temps.s2) / 2 ) * (9/5) + 32);


			// check temp cache, see if the avg temperature is below the desired temp
			if(tempCacheA.length > 5) {
				tempCacheA.shift();
				tempCacheA.forEach((element) => {
					avgTempA += element;
				});
				avgTempA = avgTempA / tempCacheA.length;
				console.log(avgTempA);
				
				if (avgTempA < controlState.setTempA) {
					relay1.write(1, (err) => {
						if(err) console.log(err);
					});
				} else {
					relay1.write(0, (err) => {
						if(err) console.log(err);
					});
				}
				avgTempA = 0.0;
				getRelayState();
			}

			// check temp cache, see if the avg temperature is below the desired temp
			if(tempCacheB.length > 5) {
				tempCacheB.shift();
				tempCacheB.forEach((element) => {
					avgTempB += element;
				});
				avgTempB = avgTempB / tempCacheB.length;
				console.log(avgTempB);
				
				if (avgTempB < controlState.setTempB) {
					relay2.write(1, (err) => {
						if(err) console.log(err);
					});
				} else {
					relay2.write(0, (err) => {
						if(err) console.log(err);
					});
				}

				avgTempB = 0.0;
				getRelayState();
			}
			console.log(tempCacheA);
			console.log(tempCacheB);

			// send temp caches to the client
			socket.emit('piTempCache', {tempCacheA, tempCacheB});


		});

		
	}
});




















