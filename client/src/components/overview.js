/**
 * Created by hudsonpeden on 4/10/17.
 */

import React, {Component} from 'react';
import {Sparklines, SparklinesLine, SparklinesReferenceLine} from 'react-sparklines';


export default class Overview extends Component {
    render() {

        let avgA = 0.0;
        let avgB = 0.0;

        this.props.tempcache.tempCacheA.forEach((element) => {
            avgA += element;

        });
        avgA = avgA / this.props.tempcache.tempCacheA.length;
        this.props.tempcache.tempCacheB.forEach((element) => {
            avgB += element;

        });
        avgB = avgB / this.props.tempcache.tempCacheB.length;


        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h3 className="panel-title">Overview</h3>
                </div>
                <div className="panel-body">
                    <div className="row">
                        <div className="col-md-3">
                            <h4>Average Temp Above Ground: </h4>
                            <h2>{avgA}</h2>
                        </div>
                        <div className="col-md-7">
                            <Sparklines data={this.props.tempcache.tempCacheA}>
                                <SparklinesLine color="blue"/>
                                <SparklinesReferenceLine type="mean"/>
                            </Sparklines>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-3">
                            <h4>Average Temp Below Ground: </h4>
                            <h2>{avgB}</h2>
                        </div>
                        <div className="col-md-7">
                            <Sparklines data={this.props.tempcache.tempCacheB}>
                                <SparklinesLine color="red"/>
                                <SparklinesReferenceLine type="mean"/>
                            </Sparklines>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}