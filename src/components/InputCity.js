import React, { useState } from 'react';
import Weather from './Weather';

function CityForm() {
  const [value, setValue] = useState('');
  const [city, setCity] = useState('Luxembourg, LU');
  const [active, setActive] = useState('metric');

  const handleActive = (e) => {
    setActive(e.target.name);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCity(value);
    setValue('');
  };

  const defaultCity = `ex: Luxembourg, LU`;
  return (
    <>
      <div id="navWrapper">
        <button
          type="button"
          name="metric"
          onClick={handleActive}
          className={active === 'metric' ? 'btn active' : 'btn'}
          id="celsiusBtn"
        >
          °C
        </button>
        <button
          type="button"
          name="imperial"
          onClick={handleActive}
          className={active === 'imperial' ? 'btn active' : 'btn'}
          id="fahrenheitBtn"
        >
          °F
        </button>

        <form onSubmit={handleSubmit} id="cityInputForm">
          <label htmlFor="cityInput" id="cityInputLabel">
            City{' '}
            <input
              type="text"
              value={value}
              id="cityInput"
              placeholder={defaultCity}
              onChange={(e) => setValue(e.target.value)}
            />
          </label>
          <input type="submit" value="Get Weather" className="btn btnLong" />
        </form>
      </div>
      <Weather location={city} units={active} />
    </>
  );
}

export default CityForm;
