/**
 * Created by hudsonpeden on 4/10/17.
 */

import React, { Component } from 'react';

export default class Controls extends Component {

    // set the values of the app on page load
    constructor(props) {
        super(props);

        this.state = {
            setTempA: '',
            setTempB: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    // the handleChange() function updates the state of this component whenever the user changes the values in the text
    // field

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        //this will set the state of the parent
        this.setState({
                [name]: parseFloat(value)
        });
    }

    // whenever the user clicks the update button, the component runs the prop update function to set the state of the
    // parent component. It also resets the text fields to empty
    handleClick() {
        this.props.onUpdate(this.state);
        this.setState = {
            setTempA: '',
            setTempB: '',
        }
    }

    // the render function renders the GUI for the control component
    render() {
        return(
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h3 className="panel-title">Controls</h3>
                </div>
                <div className="panel-body">
                    <div className="form-horizontal">
                        <h5>Above Ground Heater set to: {this.props.controls.setTempA} degrees F</h5>
                        <div className="input-group">
                            <input type="text" className="form-control" name="setTempA" value={this.state.setTempA} placeholder="Desired temperature above ground" onChange={this.handleChange}/>
                        </div>
                        <br />

                        <h5>Below Ground Heater set to: {this.props.controls.setTempB} degrees F</h5>
                        <div className="input-group">
                            <input type="text" className="form-control" name="setTempB" value={this.state.setTempB} placeholder="Desired temperature below ground" onChange={this.handleChange}/>
                        </div>
                        <br />

                        <button className="btn btn-primary" onClick={this.handleClick}>Update</button>
                    </div>
                </div>
            </div>
        );
    }
}
