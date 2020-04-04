import React from 'react';
import ReactDOM from 'react-dom';

import 'regenerator-runtime/runtime';
import 'core-js/stable';

import App from './App';

import './sass/main.scss';

const root = document.getElementById('app');

ReactDOM.render(<App />, root);
