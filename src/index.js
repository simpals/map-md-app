import 'react-app-polyfill/ie9';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as methods from './methods';

const renderMapApp = (options) => {
  if (!options.container) {
    console.warn('container is not defined');
  }
  ReactDOM.render(<App {...options} />, document.querySelector(options.container || '#root'));
};

if (process.env.REACT_APP_MAP_ENV === 'development') {
  renderMapApp({
    apiKey: process.env.API_KEY,
    container: '#root',
    viewport: {
      zoom: 10
    }
  });
}

export default {
  MapApp: App,
  renderMapApp,
  methods
};
