import React, { Component } from 'react';
import './App.css';
import io from 'socket.io-client';

const socket = io();


class App extends Component {
    state = {cities: []};

    async componentDidMount() {
        // const response = await fetch('/cities');
        // const cities   = await response.json();

        socket.on('sendCities', (data) => {
            console.log(data);
            this.setState({cities: data})
        });
    }

    render() {
        return (
            <div>
                <ul>
                    {this.state.cities.map( city => {
                        return <li key={city.name}> <b>{city.name}</b>: {city.population}</li>
                    })}
                </ul>
            </div>
        );
    }
}

export default App;