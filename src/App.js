import React, { Component } from 'react';
import SingleDay from './single-day';
import './App.css';

const API_KEY = `${process.env.REACT_APP_WEATHER_API_KEY}`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cityName: null,
      descD: null,
      temp: null,
      wind: null,
      windDeg: null,
      humidity: null,
      pressure: null,
      weatherIcon: './img/001-sun.png',
      weatherIconn: './img/001-sun.png',
      weatherIconnm: './img/001-sun.png',
      date: new Date()
    }

  }

   componentDidMount() {

    const base_link = `https://api.openweathermap.org/data/2.5/forecast?q=krakow&APPID=`+API_KEY+`&units=metric`;

    fetch(base_link, {
      method: 'GET'
    })
    .then(response => response.json())
    .then(json => {
        const cityName = json.city['name'];
        // current day
        const temp = (json.list[0]['main']['temp']).toFixed(0);
        const desc = (json.list[0]['weather'][0]['description'] );
        const descD = desc;
        const wind = (json.list[0]['wind']['speed']).toFixed(0);
        const windDeg = (json.list[0]['wind']['deg']).toFixed(0); 
        const humidity = (json.list[0]['main']['humidity']);
        const pressure = (json.list[0]['main']['sea_level']).toFixed(0);
        // tomorrow
        const tempn = (json.list[1]['main']['temp']).toFixed(0);
        const descn = (json.list[1]['weather'][0]['description'] );
        const descDn = descn;
        const windn = (json.list[1]['wind']['speed']).toFixed(0);
        const windDegn = (json.list[1]['wind']['deg']).toFixed(0); 
        const humidityn = (json.list[1]['main']['humidity']);
        const pressuren = (json.list[1]['main']['sea_level']).toFixed(0);
        // day after 
        const tempnm = (json.list[2]['main']['temp']).toFixed(0);
        const descnm = (json.list[2]['weather'][0]['description'] );
        const descDnm = descnm;
        const windnm = (json.list[2]['wind']['speed']).toFixed(0);
        const windDegnm = (json.list[2]['wind']['deg']).toFixed(0); 
        const humiditynm = (json.list[2]['main']['humidity']);
        const pressurenm = (json.list[2]['main']['sea_level']).toFixed(0);

        this.setState({
          cityName, temp, descD, wind, windDeg, humidity, pressure, tempn, descDn, windn, windDegn, humidityn, pressuren, tempnm, descDnm, windnm, windDegnm, humiditynm, pressurenm, 
        })

       switch (this.state.descD) {
          case 'few clouds':
          case 'broken clouds':
            this.setState({weatherIcon: './img/001-sun.png'});
            break;
          case 'light rain':
          case 'rain':
          case 'shower rain':
          case 'moderate rain':
            this.setState({weatherIcon: './img/004-drop.png'});
            break;
          case 'clear sky':
            this.setState({weatherIcon: './img/002-sunny.png'});
            break;
          case 'scattered clouds':
            this.setState({weatherIcon: './img/003-clouds.png'});
            break;
          case 'thunderstorm':
            this.setState({weatherIcon: './img/006-thunder.png'});
            break;
          case 'snow':
            this.setState({weatherIcon: './img/005-snowflake.png'});
            break;
       }

       switch (this.state.descDn) {
          case 'few clouds':
          case 'broken clouds':
            this.setState({weatherIconn: './img/001-sun.png'});
            break;
          case 'light rain':
          case 'rain':
          case 'shower rain':
          case 'moderate rain':
            this.setState({weatherIconn: './img/004-drop.png'});
            break;
          case 'clear sky':
            this.setState({weatherIconn: './img/002-sunny.png'});
            break;
          case 'scattered clouds':
            this.setState({weatherIconn: './img/003-clouds.png'});
            break;
          case 'thunderstorm':
            this.setState({weatherIconn: './img/006-thunder.png'});
            break;
          case 'snow':
            this.setState({weatherIconn: './img/005-snowflake.png'});
            break;      
       }

       switch (this.state.descDnm) {
          case 'few clouds':
          case 'broken clouds':
            this.setState({weatherIconnm: './img/001-sun.png'});
            break;
          case 'light rain':
          case 'rain':
          case 'shower rain':
          case 'moderate rain':
            this.setState({weatherIconnm: './img/004-drop.png'});
            break;
          case 'clear sky':
            this.setState({weatherIconnm: './img/002-sunny.png'});
            break;
          case 'scattered clouds':
            this.setState({weatherIconnm: './img/003-clouds.png'});
            break;
          case 'thunderstorm':
            this.setState({weatherIconnm: './img/006-thunder.png'});
            break;
          case 'snow':
            this.setState({weatherIconnm: './img/005-snowflake.png'});
            break;
       }

      });
    }

render() {
    const rotate = {WebkitTransform: `rotate(${this.state.windDeg}deg)`};
    const rotaten = {WebkitTransform: `rotate(${this.state.windDegn}deg)`};
    const rotatenm = {WebkitTransform: `rotate(${this.state.windDegnm}deg)`};

    /* get name of the day function*/ 
    const d = new Date();
    const weekday = new Array(7);
    weekday[0] =  "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";
    const nameOfDay = weekday[d.getDay()];
    const nameOfDayn = weekday[d.getDay()+1];
    const nameOfDaynm = weekday[d.getDay()+2];
    // get date of two next days
    const daten = new Date();
    daten.setDate(daten.getDate() + 1);
    const datenm = new Date();
    datenm.setDate(datenm.getDate() + 2);

    return (
      <div className="widget">
      <h1>{this.state.cityName}</h1>
          <div className="boxCont">

            <SingleDay weatherIcon={this.state.weatherIcon} date={this.state.date.toLocaleDateString()} nameOfDay={nameOfDay} descD={this.state.descD} temp={this.state.temp} wind={this.state.wind} windDeg={this.state.windDeg} rotate={rotate} humidity={this.state.humidity} pressure={this.state.pressure} 
            />

            <SingleDay weatherIcon={this.state.weatherIconn} date={daten.toLocaleDateString()} nameOfDay={nameOfDayn} descD={this.state.descDn} temp={this.state.tempn} wind={this.state.windn} windDeg={this.state.windDegn} rotate={rotaten} humidity={this.state.humidityn} pressure={this.state.pressuren} 
            />

            <SingleDay weatherIcon={this.state.weatherIconnm} date={datenm.toLocaleDateString()} nameOfDay={nameOfDaynm}  descD={this.state.descDnm} temp={this.state.tempnm} wind={this.state.windnm} windDeg={this.state.windDegnm} rotate={rotatenm} humidity={this.state.humiditynm} pressure={this.state.pressurenm} 
            />

              
          </div>   
      </div>   
    );
    
    
  }
}

export default App;
