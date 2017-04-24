/**
 * Created by hudsonpeden on 4/10/17.
 */

import React, { Component } from 'react';

export default class Controls extends Component {

    constructor(props) {
        super(props);

        this.state = {
            setTempA: '',
            setTempB: '',
            onIntA: '',
            offIntA: '',
            onIntB: '',
            offIntB: ''

        };

        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    async componentDidMount() {

    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        //this will set the state of the parent
        this.setState({
                [name]: parseFloat(value)
        });
    }

    handleClick() {
        this.props.onUpdate(this.state);
        this.setState = {
            setTempA: '',
            setTempB: '',
            onIntA: '',
            offIntA: '',
            onIntB: '',
            offIntB: ''
        }
    }

    render() {
        return(
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h3 className="panel-title">Controls</h3>
                </div>
                <div className="panel-body">
                    <h5>Above Ground Heater</h5>
                    <div className="input-group">
                        <input type="text" className="form-control" name="setTempA" value={this.state.setTempA} placeholder={`desired temp: ${this.props.controls.setTempA} degrees`} onChange={this.handleChange}/>
                    </div>
                    <br />

                    <h5>Below Ground Heater</h5>
                    <div className="input-group">
                        <input type="text" className="form-control" name="setTempB" value={this.state.setTempB} placeholder={`desired temp: ${this.props.controls.setTempB} degrees`} onChange={this.handleChange}/>
                    </div>
                    <br />

                    <button className="btn btn-primary" onClick={this.handleClick}>Update</button>
                </div>
            </div>
        );
    }
}
