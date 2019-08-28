import React, { Component } from 'react';
import SingleDay from './single-day';
import './App.css';

const API_KEY = `${process.env.REACT_APP_WEATHER_API_KEY}`;

class App extends Component {
    state = {
        cityName: ''
    };

    getTheForecastIcon = (stateProperty, stateForWeatherIcon) => {
        switch (stateProperty) {
            case 'few clouds':
            case 'broken clouds':
                this.setState({[stateForWeatherIcon]: './img/001-sun.png'});
                break;
            case 'light rain':
            case 'rain':
            case 'shower rain':
            case 'moderate rain':
                this.setState({[stateForWeatherIcon]: './img/004-drop.png'});
                break;
            case 'clear sky':
                this.setState({[stateForWeatherIcon]: '../img/002-sunny.png'});
                break;
            case 'scattered clouds':
                this.setState({[stateForWeatherIcon]: './img/003-clouds.png'});
                break;
            case 'thunderstorm':
                this.setState({[stateForWeatherIcon]: './img/006-thunder.png'});
                break;
            case 'snow':
                this.setState({[stateForWeatherIcon]: './img/005-snowflake.png'});
                break;
            default:
                this.setState({[stateForWeatherIcon]: './img/003-clouds.png'});
                break;
        }
    };

    updateForecast = (json, currentStatePropertyPrefix, currentStateIndexValue) => {

        const cityName = json.city['name'],
              temp = (json.list[currentStateIndexValue]['main']['temp']).toFixed(0),
              descDetails = (json.list[currentStateIndexValue]['weather'][0]['description']),
              wind = (json.list[currentStateIndexValue]['wind']['speed']).toFixed(0),
              windDeg = (json.list[currentStateIndexValue]['wind']['deg']).toFixed(0),
              humidity = (json.list[currentStateIndexValue]['main']['humidity']),
              pressure = (json.list[currentStateIndexValue]['main']['sea_level']).toFixed(0);

        this.setState({
            ['cityName' +currentStatePropertyPrefix]: cityName,
            ['temp' +currentStatePropertyPrefix]: temp,
            ['descDetails' +currentStatePropertyPrefix]: descDetails,
            ['wind' +currentStatePropertyPrefix]: wind,
            ['windDeg' +currentStatePropertyPrefix]: windDeg,
            ['humidity' +currentStatePropertyPrefix]: humidity,
            ['pressure' +currentStatePropertyPrefix]: pressure,
        });
    };

    windIndicator = (selector) => {
        return { WebkitTransform: `rotate(${this.state[selector]}deg)`}
    };

    getTheDay = (multiplier) => {
        return new Date(new Date().valueOf() + 1000*3600*multiplier).toLocaleTimeString('en-us', { weekday: 'long'}).toString().split(' ')[0];
    };

    getCurrentDate = (value) => {
        const today = new Date();
        const date = (today.getDate() + value) +'.'+(today.getMonth()+1)+'.'+today.getFullYear();

        return date
    };

   componentDidMount() {
    const base_link = `https://api.openweathermap.org/data/2.5/forecast?q=krakow&APPID=`+API_KEY+`&units=metric`;

    fetch(base_link, {
      method: 'GET'
    })
    .then(response => response.json())
    .then(json => {

        this.updateForecast(json, '', 0);
        this.updateForecast(json, 'NextDay', 1);
        this.updateForecast(json, 'DayAfterNext', 2);

        this.getTheForecastIcon(this.state.descDetails, 'weatherIcon');
        this.getTheForecastIcon(this.state.descDetailsNextDay, 'weatherIconNextDay');
        this.getTheForecastIcon(this.state.descDetailsDayAfterNext, 'weatherIconDayAfterNext');
      });
    }

render() {
    return (
      <div className="widget">
      <h1>{this.state.cityName}</h1>
          <div className="boxCont">

            <SingleDay weatherIcon={this.state.weatherIcon} date={this.getCurrentDate(0)} nameOfDay={this.getTheDay(1)} descDetails={this.state.descDetails} temp={this.state.temp} wind={this.state.wind} windDeg={this.state.windDeg} rotate={this.windIndicator('windDeg')} humidity={this.state.humidity} pressure={this.state.pressure}
            />

            <SingleDay weatherIcon={this.state.weatherIconNextDay} date={this.getCurrentDate(1)} nameOfDay={this.getTheDay(24)} descDetails={this.state.descDetailsNextDay} temp={this.state.tempNextDay} wind={this.state.windNextDay} windDeg={this.state.windDegNextDay} rotate={this.windIndicator('windDegNextDay')} humidity={this.state.humidityNextDay} pressure={this.state.pressureNextDay}
            />

            <SingleDay weatherIcon={this.state.weatherIconDayAfterNext} date={this.getCurrentDate(2)} nameOfDay={this.getTheDay(48)}  descDetails={this.state.descDetailsDayAfterNext} temp={this.state.tempDayAfterNext} wind={this.state.windDayAfterNext} windDeg={this.state.windDegDayAfterNext} rotate={this.windIndicator('windDegDayAfterNext')} humidity={this.state.humidityDayAfterNext} pressure={this.state.pressureDayAfterNext}
            />

          </div>
      </div>
    );
  }
}

export default App;
