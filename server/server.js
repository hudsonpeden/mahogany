// import bodyParser from 'body-parser';
import express from 'express';
import path from 'path';

const app = express();

const server = app.listen(process.env.PORT || 3001,  () => console.log('Node Backend running on Port 3001'));
const io = require('socket.io')(server);


// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: false}));


// pull frontend from client directory and serve static files
// express.static is a middleware function
const staticFiles = express.static(path.join(__dirname, '../../client/build'));
app.use(staticFiles);


    const cities = [
        {name: 'New York City', population: 8175133},
        {name: 'Los Angeles',   population: 3792621},
        {name: 'Chicago',       population: 2695598},

    ];

io.on('connection', socket => {
    console.log('a user connected');
    socket.emit('sendCities', cities);
});


app.use('/*', staticFiles);
