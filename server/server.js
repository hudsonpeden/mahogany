// import bodyParser from 'body-parser';
import express from 'express';
import path from 'path';

const app = express();
//heroku uses the dynamic PORT setup here. 3001 for local run
const server = app.listen(process.env.PORT || 3001,  () => console.log('Node Backend running on Port 3001'));
const io = require('socket.io')(server);
const wwwhisper = require('connect-wwwhisper');

app.use(wwwhisper());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: false}));


// pull frontend from client directory and serve static files
// express.static is a middleware function
const staticFiles = express.static(path.join(__dirname, '../../client/build'));
app.use(staticFiles);



io.on('connection', socket => {
    console.log('a user connected', socket.id);


    socket.on('tempUpdate', (tempObj) => {
        console.log(tempObj);
        io.sockets.emit('sendTemps', tempObj);
    });

    socket.on('hello', (data) => {
        console.log('hello ' + data);
    });

    socket.on('disconnect', () => {
        console.log('a user disconnected');
    });

    socket.on('requestRelayState', () => {
        console.log('requesting relay state');
        io.sockets.emit('sendRelayRequest', 'send');
    });

    socket.on('piRelayValue', (val) => {
        console.log(val);
        io.sockets.emit('serverRelayValue', val);
    });

    socket.on('requestControlState', () => {
        console.log('requesting control state');
        io.sockets.emit('sendControlRequest', 'send');
    });

    socket.on('piControlValue', (val) => {
        console.log(val);
        io.sockets.emit('serverControlValue', val);
    });

    socket.on('sendUpdatedControls', (val) => {
        console.log(val);
        io.sockets.emit('updatedControls', val);
    });

    socket.on('piTempCache', (val) => {
        console.log('tempCache: ', val);
        io.sockets.emit('serverTempCache', val);
    });

});


app.use('/*', staticFiles);
