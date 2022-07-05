import 'jsdom-global/register';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

jest.mock('mapbox-gl/dist/mapbox-gl', () => ({
  GeolocateControl: jest.fn(),
  Map: jest.fn(() => ({
    addControl: jest.fn(),
    on: jest.fn(),
    remove: jest.fn(),
    fitBounds: jest.fn()
  })),
  LngLat: jest.fn(),
  LngLatBounds: jest.fn(),
  NavigationControl: jest.fn(),
  Popup: jest.fn()
}));

it('renders without crashing', () => {
  const div = document.createElement('div');
  const testOptions = {
    apiKey: '2582e284-1087-421c-baaa-94020703c462'
  };
  ReactDOM.render(<App {...testOptions} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
