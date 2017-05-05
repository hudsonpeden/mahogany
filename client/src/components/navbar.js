import React, { Component } from 'react';


/*
*   This component renders the top navbar of the app
*
* */


export default class Navbar extends Component {
    render() {
        return(
            <div className="navbar navbar-default">
                <div className="navbar-header">
                    <a className="navbar-brand" href="#">Mahogany</a>
                </div>
            </div>
        );
    }
}