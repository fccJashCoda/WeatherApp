import React from 'react';
import ReactDOM from 'react-dom';

import 'regenerator-runtime/runtime';
import 'core-js/stable';
import './sass/main.scss';

import App from './App';

const root = document.getElementById('app');

ReactDOM.render(<App />, root);
