import React, { useState, useEffect } from 'react';
import Weather from './Weather';

function CityForm() {
  const [value, setValue] = useState('');
  const [city, setCity] = useState('Luxembourg, LU');
  const [error, setError] = useState();
  const [active, setActive] = useState('metric');

  useEffect(() => {
    async function localize() {
      setError();
      const response = await fetch('http://ip-api.com/json/')
        .then((res) => res.json())
        .catch((err) => setError(err));
      if (!error && response.status === 'success') {
        const result = `${response.city}, ${response.country}`;
        setCity(result);
      }
    }
    localize();
  }, []);

  const handleActive = (e) => {
    setActive(e.target.name);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;
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
