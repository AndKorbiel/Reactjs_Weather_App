import React, { Component } from 'react';
import './App.css';

class SingleDay extends Component {

  render() {
    return (
              <div className="day">
                <div className="top">
                  <img className="weatherIcon" src={this.props.weatherIcon} />
                  <div className="time">
                    <h3>{this.props.nameOfDay}, {this.props.date} </h3>
                    <h3 className="maininfo">{this.props.descDetails},<br /> {this.props.temp}&deg;C</h3>
                  </div>
                </div>
                <ul>
                  <li>Wind: <b>{this.props.wind} km/h </b></li>
                  <li>Wind direction: <b>{this.props.windDeg}&deg; </b> <i className="fa fa-arrow-up" aria-hidden="true" style={this.props.rotate}></i></li>
                  <li>Humidity: <b>{this.props.humidity}%</b> </li>
                  <li>Pressure: <b>{this.props.pressure} hPa</b> </li>
                </ul>

              </div>
    );
  }
}

export default SingleDay;
