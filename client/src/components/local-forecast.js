/**
 * Created by hudsonpeden on 4/10/17.
 */
import React, { Component } from 'react';
import axios from 'axios';


const API_KEY = "1a47e0770f5a578fbc44d75ab71fbc90";
const ROOT_URL = `http://api.openweathermap.org/data/2.5/forecast?appid=${API_KEY}`;

export default class Forecast extends Component {



    render() {
        console.log(fetchWeather());

        return(
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h3 className="panel-title">Local Forecast</h3>
                </div>
                <div className="panel-body">
                    <p>Yayayyayayayayyayayayay</p>
                </div>
            </div>
        );
    }
}

function fetchWeather() {
    const url = `${ROOT_URL}&q=$zip=38305,us`;


    return axios.get(url);
}