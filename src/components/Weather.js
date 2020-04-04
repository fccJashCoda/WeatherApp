import React, { useState, useEffect } from 'react';
import { DateTime as dt } from 'luxon';
import apiKeys from '../apiKeys';
import SassHelper from './SassHelper';
import ErrorPage from './ErrorPage';

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
  if (weather.cod !== 200) {
    return (
      <>
        <ErrorPage weather={weather} />
        <SassHelper weather={weather} units={units} />
      </>
    );
  }

  const recorded = dt
    .fromSeconds(weather.dt)
    .toUTC()
    .plus({ hours: weather.timezone / 3600 })
    .toFormat('tt');
  const temperature = (+weather.main.temp).toFixed(1);
  const feelsLike = (+weather.main.feels_like).toFixed(1);
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
          <p>
            Recorded today at <span className="thick">{recorded}</span> Local
            time.
          </p>
        </div>
        <div id="cityTemperature">
          <div id="cityBox">
            <p className="temperature">
              {temperature}°{scales[units].symbol}
            </p>
            <p className="feelsLike">
              Feels like:{' '}
              <span className="thick">
                {feelsLike} °{scales[units].symbol}
              </span>
            </p>
            <p className="sky">
              Sky:{' '}
              <span className="thick">
                {weather.weather[0].main}, {weather.weather[0].description}
              </span>
            </p>
          </div>
        </div>
        <div id="cityBarometer">
          <p>
            Wind:{' '}
            <span className="thick">
              {units === 'metric'
                ? (weather.wind.speed * 3.6).toFixed(2)
                : weather.wind.speed}{' '}
              {scales[units].speedUnit}
            </span>
          </p>
          <p>
            Humidity: <span className="thick">{weather.main.humidity}%</span>
          </p>
          <p>
            Pressure: <span className="thick">{weather.main.pressure} hPa</span>
          </p>
          <p>
            Visibility: <span className="thick">{visibility}</span>
          </p>
        </div>
        <div id="citySun">
          <p>
            Sunrise: <span className="thick">{sunrise}</span>
          </p>
          <p>
            Sunset: <span className="thick">{sunset}</span>
          </p>
        </div>
      </div>
      <SassHelper weather={weather} units={units} />
    </>
  );
}

export default Weather;
