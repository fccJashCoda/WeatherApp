import React, { useState, useEffect } from 'react';
import { DateTime as dt } from 'luxon';
import apiKeys from '../apiKeys';
import SassHelper from './SassHelper';

function Weather(props) {
  const { location, units } = props;
  const [weather, setWeather] = useState();
  const [error, setError] = useState();

  const scales = {
    metric: {
      symbol: 'C',
      speedUnit: 'km/h',
    },
    imperial: {
      symbol: 'F',
      speedUnit: 'mp/h',
    },
  };

  useEffect(() => {
    setError();
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${location}&units=${units}&appid=${apiKeys.openWeather}`
    )
      .then((res) => res.json())
      .then((res) => setWeather(res))
      .catch((err) => setError(err));
  }, [location, units]);

  if (error) return <p>Error!</p>;
  if (!weather) return <p>Loading...</p>;
  if (weather.cod !== 200)
    return (
      <>
        <p>
          {weather.cod}, {weather.message}
        </p>
        <SassHelper />
      </>
    );

  const recorded = dt
    .fromSeconds(weather.dt)
    .toUTC()
    .plus({ hours: weather.timezone / 3600 })
    .toFormat('tt');
  const sunrise = dt
    .fromSeconds(weather.sys.sunrise)
    .toUTC()
    .plus({ hours: weather.timezone / 3600 })
    .toFormat('tt');
  const sunset = dt
    .fromSeconds(weather.sys.sunset)
    .toUTC()
    .plus({ hours: weather.timezone / 3600 })
    .toFormat('tt');

  const visibility =
    weather.visibility >= 10000
      ? 'Excellent'
      : weather.visibility >= 7000
      ? 'Average'
      : 'Bad';
  return (
    <>
      <div id="weatherGrid">
        <div id="locationInfo">
          <h2>
            Weather for: {weather.name}, {weather.sys.country}
          </h2>
          <p>Recorded today at {recorded} Local time.</p>
        </div>
        <div id="cityTemperature">
          <p>
            Temperature: {weather.main.temp} °{scales[units].symbol}
          </p>
          <p>
            Feels like: {weather.main.feels_like} °{scales[units].symbol}
          </p>
        </div>
        <div id="citySky">
          <p>
            Sky: {weather.weather[0].main}, {weather.weather[0].description}
          </p>
          <p>
            Wind:{' '}
            {units === 'metric'
              ? (weather.wind.speed * 3.6).toFixed(2)
              : weather.wind.speed}{' '}
            {scales[units].speedUnit}
          </p>
        </div>
        <div id="cityBarometer">
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Pressure: {weather.main.pressure} hPa</p>
          <p>Visibility: {visibility}</p>
        </div>
        <div id="citySun">
          <p>Sunrise: {sunrise}</p>
          <p>Sunset: {sunset}</p>
        </div>
      </div>
      <SassHelper weather={weather} units={units} />
    </>
  );
}

export default Weather;
