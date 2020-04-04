const utilities = {
  temperatures: [
    'cold1',
    'cold2',
    'cold3',
    'cold4',
    'cold5',
    'cold6',
    'cold7',
    'cold8',
    'cold9',
    'cold10',
    'cold11',
    'cold12',
    'cold13',
    'hot1',
    'hot2',
    'hot3',
    'hot4',
    'hot5',
    'hot6',
    'hot7',
    'hot8',
    'hot9',
    'hot10',
    'hot11',
    'hot12',
    'hot13',
    'hot14',
    'hot15',
    'hot16',
    'hot17',
    'hot18',
    'hot19',
    'hot20',
  ],

  toCelsius: (fahrenheit) => (fahrenheit - 32) * (5 / 9),
  setBackgroundColor: (data, scale) => {
    if (data.cod !== 200) {
      return;
    }
    const background = document.getElementById('weatherGrid');
    const accent = document.getElementById('app');
    const weatherDivs = background.querySelectorAll('div');

    const { temperatures, toCelsius } = utilities;
    const feelsLike = data.main.feels_like;
    const temp = scale === 'imperial' ? toCelsius(feelsLike) : feelsLike;

    if (temp < 0) {
      weatherDivs.forEach((item) => (item.className = temperatures[0]));
      accent.className = `${temperatures[0]}dark`;
    } else if (temp > temperatures.length) {
      weatherDivs.forEach(
        (item) => (item.className = temperatures[temperatures.length - 1])
      );
      accent.className = `${temperatures[temperatures.length - 1]}dark`;
    } else {
      weatherDivs.forEach(
        (item) => (item.className = temperatures[Math.floor(temp)])
      );
      accent.className = `${temperatures[Math.floor(temp)]}dark`;
    }
  },
};

export default utilities;
