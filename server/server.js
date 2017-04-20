// import bodyParser from 'body-parser';
import express from 'express';
import path from 'path';

const app = express();
//heroku uses the dynamic PORT setup here. 3001 for local run
const server = app.listen(process.env.PORT || 3001,  () => console.log('Node Backend running on Port 3001'));
const io = require('socket.io')(server);


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
});


app.use('/*', staticFiles);
