/**
 * Created by hudsonpeden on 4/10/17.
 */

import React, { Component } from 'react';

/*
*       This component gives the user the current values for each of the sensors and relays in the system.
*
*       Sensors display ON or OFF if they are TRUE or FALSE, respectively
*
*       s1, s2, s3, represent the temperature sensors in the system
*
*
* */

export default class SystemData extends Component {



    render() {
        const heater1 = (this.props.relays.r1) ? 'ON' : 'OFF';
        const heater2 = (this.props.relays.r2) ? 'ON' : 'OFF';

        return(
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h3 className="panel-title">System Data</h3>
                </div>
                <div className="panel-body">
                    <ul className="list-group">
                        <li className="list-group-item">
                            <span className="badge">{Math.round(((this.props.temp.s1) * (9/5) + 32)*100 ) /100}</span>
                            Sensor 1
                        </li>
                        <li className="list-group-item">
                            <span className="badge">{Math.round(((this.props.temp.s2) * (9/5) + 32)*100)/100}</span>
                            Sensor 2
                        </li>
                        <li className="list-group-item">
                            <span className="badge">{Math.round(((this.props.temp.s3) * (9/5) + 32)*100)/100}</span>
                            Sensor 3
                        </li>
                        <li className="list-group-item">
                            <span className="badge">{heater1}</span>
                            Heater 1
                        </li>
                        <li className="list-group-item">
                            <span className="badge">{heater2}</span>
                            Heater 2
                        </li>
                    </ul>
                </div>
            </div>
        );

    }
}