// import bodyParser from 'body-parser';
import express from 'express';
import path from 'path';

const app = express();
//heroku uses the dynamic PORT setup here. 3001 for local run
const server = app.listen(process.env.PORT || 3001,  () => console.log('Node Backend running on Port 3001'));
const io = require('socket.io')(server);
const wwwhisper = require('connect-wwwhisper');

// use the authentication app wwwhisper in the app
app.use(wwwhisper());



// pull frontend from client directory and serve static files
// express.static is a middleware function
const staticFiles = express.static(path.join(__dirname, '../../client/build'));
app.use(staticFiles);


// initiate socket.io connection

// each of these events listens for data to be sent to the front end or returned from the raspberry pi
io.on('connection', socket => {
    console.log('a user connected', socket.id);

    // grab current temps from RPi
    socket.on('tempUpdate', (tempObj) => {
        console.log(tempObj);
        io.sockets.emit('sendTemps', tempObj);
    });

    // if client or pi disconnects, log it
    socket.on('disconnect', () => {
        console.log('a user disconnected');
    });

    // grab the current state of the relays
    socket.on('requestRelayState', () => {
        console.log('requesting relay state');
        io.sockets.emit('sendRelayRequest', 'send');
    });

    // send the current relay state to the front end
    socket.on('piRelayValue', (val) => {
        console.log(val);
        io.sockets.emit('serverRelayValue', val);
    });

    // grab the current state of the controls on load
    socket.on('requestControlState', () => {
        console.log('requesting control state');
        io.sockets.emit('sendControlRequest', 'send');
    });

    // send the current state of the controls to the front end
    socket.on('piControlValue', (val) => {
        console.log(val);
        io.sockets.emit('serverControlValue', val);
    });

    // whenever user updates controls, send them
    socket.on('sendUpdatedControls', (val) => {
        console.log(val);
        io.sockets.emit('updatedControls', val);
    });


    // grab the tempCache from the RPi
    socket.on('piTempCache', (val) => {
        console.log('tempCache: ', val);
        io.sockets.emit('serverTempCache', val);
    });

});

// grab the front end files
app.use('/*', staticFiles);
