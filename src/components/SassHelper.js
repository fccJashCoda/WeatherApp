import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
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

SassHelper.propTypes = {
  weather: PropTypes.object.isRequired,
  units: PropTypes.string.isRequired,
};
export default SassHelper;
