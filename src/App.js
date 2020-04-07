import React from 'react';
import CityForm from './components/InputCity';

function App() {
  return (
    <>
      <header id="accent" />
      <CityForm />
    </>
  );
}

export default App;

/*
  Todo
  [x] Implement fahrenheit celsius toggle
  [x] Implement wind speed conversion to kmh / mph
  [x] implement a background color shift or/and
  [x] implement a giphy fetch on weather description
  [x] Fix timezones on fetch with Luxon
  [x] Fix proptypes
  [x] design
  [x] Implement geolocation
*/
