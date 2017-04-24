/**
 * Created by hudsonpeden on 4/23/17.
 */
import React, { Component } from 'react';
import Navbar from './navbar';
import AppBody from './app-body';

export default class Home extends Component {

    showLock() {
        this.props.lock.show();
    }

    render() {
        return(
            <div>
                <div className="login-box">
                    <a onClick={this.showLock}>Sign in</a>
                </div>


            </div>
        );
    }
}