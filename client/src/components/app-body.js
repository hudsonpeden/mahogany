import React, { Component } from 'react';
import Overview from "./overview";
import SystemData from "./system-data";
//mport Forecast from "./local-forecast";
import Controls from "./controls";
import io from 'socket.io-client';

const socket = io();

export default class AppBody extends Component {

    // The state object stores what the front end needs to know about the application
    state = {
        temp: {
            s1: 0.0,
            s2: 0.0,
            s3: 0.0
        },
        relays: {
            r1: 0,
            r2: 0
        },
        controls: {
            setTempA: 50,
            setTempB: 50,
        },
        tempCache: {
            tempCacheA: [],
            tempCacheB: []
        }
    };

    //this function runs everytime the state is updated
    async componentDidMount() {
        console.log('component did mount');

        // connect to backend
        socket.on('connect', () => {
            console.log('connected to server ' + socket.id);
            socket.emit('hello', 'hello from front end');
        });
        // request the state of the relays and controls
        socket.emit('requestRelayState', 'request');
        socket.emit('requestControlState', 'request');

        // return the temperatures from the raspberry pi
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

        // return the values of the relays from the raspberry pi
        socket.on('serverRelayValue', (val) => {
           console.log(val);
           this.setState({
               relays: {
                   r1: val[0],
                   r2: val[1]
               }
           })
        });

        // grab the set temperatures of the raspberry pi
        socket.on('serverControlValue', (val) => {
            console.log(val);
            this.setState({
                controls: {
                    setTempA: val.setTempA,
                    setTempB: val.setTempB,
                }
            })

        });

        // grab the temperature cache from the raspberry pi
        socket.on('serverTempCache', (val) => {
            console.log(val);
            this.setState({
                tempCache: {
                    tempCacheA: val.tempCacheA,
                    tempCacheB: val.tempCacheB
                }
            });
            console.log(this.state.tempCache);
        });

    }

    // whenever the user clicks the update button, the set temperatures are updated
    updateControls(state) {
        //console.log(state);
        this.setState({
            controls: {
                setTempA: state.setTempA,
                setTempB: state.setTempB,
            }
        });

        socket.emit('sendUpdatedControls', this.state.controls);
    }

    // this function renders the child components of the application: Overview, Controls, and SystemData
    render() {
        return(
            <div className="row">
                <div className="col-md-10 col-md-offset-1">
                    <Overview tempcache={this.state.tempCache}/>
                    <div className="row">
                        <div className="col-md-6">
                            <Controls controls={this.state.controls} onUpdate={this.updateControls = this.updateControls.bind(this)}/>
                        </div>
                        <div className="col-md-6">
                            <SystemData temp={this.state.temp} relays={this.state.relays}/>

                        </div>
                    </div>
                </div>
            </div>

        );
    }
}