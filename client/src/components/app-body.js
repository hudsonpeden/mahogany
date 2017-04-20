import React, { Component } from 'react';
import Overview from "./overview";
import SystemData from "./system-data";
import Forecast from "./local-forecast";
import Controls from "./controls";
import io from 'socket.io-client';

const socket = io();

export default class AppBody extends Component {
    state = {
        temp: {
            s1: 0.0,
            s2: 0.0,
            s3: 0.0
        },
        relays: {
            r1: 0,
            r2: 0
        }
    };

    async componentDidMount() {
        console.log('component did mount');
        // const response = await fetch('/cities');
        // const cities   = await response.json();

        socket.on('connect', () => {
            console.log('connected to server ' + socket.id);
            socket.emit('hello', 'hello from front end');
        });
        socket.emit('requestRelayState', 'request');

        socket.on('sendTemps', (obj) => {
            console.log('temps ' + JSON.stringify(obj));
            this.setState({
                temp: {
                    s1: obj.s1,
                    s2: obj.s2,
                    s3: obj.s3
                }
            });

            console.log('updated state: ' + JSON.stringify(this.state));
        });

        socket.on('serverRelayValue', (val) => {
           console.log(val);
           this.setState({
               relays: {
                   r1: val[0],
                   r2: val[1]
               }
           })
        });

    }


    render() {
        return(
            <div className="row">
                <div className="col-md-10 col-md-offset-1">
                    <Overview/>
                    <div className="row">
                        <div className="col-md-6">
                            <Controls/>
                        </div>
                        <div className="col-md-6">
                            <SystemData temp={this.state.temp} relays={this.state.relays}/>
                            <Forecast/>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}