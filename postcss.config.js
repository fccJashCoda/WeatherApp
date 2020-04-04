const autoPrefixer = require('autoprefixer');
const cssNano = require('cssnano');

if (process.env.NODE_ENV === 'production') {
  module.exports = {
    plugins: [autoPrefixer, cssNano],
  };
}
