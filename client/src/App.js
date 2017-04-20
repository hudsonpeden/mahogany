import React, { Component } from 'react';
import './App.css';
import Navbar from './components/navbar.js';
import AppBody from "./components/app-body";




class App extends Component {

    render() {
        return (
            <div className="App">
                <Navbar/>
                <AppBody/>
            </div>
        );
    }
}

export default App;