import React, { useEffect } from 'react';
import utilities from '../config';

const { setBackgroundColor } = utilities;

function SassHelper(props) {
  const { weather, units } = props;

  useEffect(() => {
    setBackgroundColor(weather, units);
  }, [weather]);

  return (
    <>
      <footer>&copy; WeatherApp, 2020</footer>
    </>
  );
}

export default SassHelper;
