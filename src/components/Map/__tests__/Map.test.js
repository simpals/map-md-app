import 'jsdom-global/register';
import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { DEFAULT_VIEWPORT } from '../../../constants';

import Map from '..';

jest.mock('mapbox-gl', () => ({
  GeolocateControl: jest.fn(),
  Map: jest.fn(() => ({
    addControl: jest.fn(),
    on: jest.fn(),
    once: jest.fn(),
    getPitch: jest.fn(),
    touchZoomRotate: {
      enable: jest.fn()
    }
  })),
  LngLat: jest.fn(),
  LngLatBounds: jest.fn(),
}));

const setApiKey = ''; // API key
const ENCODE = Buffer.from(`${setApiKey}:pashalka`).toString('base64');
const AUTHORIZATION = `Basic ${ENCODE}`;

const props = {
  authorization: AUTHORIZATION,
  mapStyles: {},
  viewport: DEFAULT_VIEWPORT
};

describe('test Map component', () => {
  it('renders without crashing', () => {
    const component = shallow(<Map {...props} />);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('test Map component useEffect', (done) => {
    const component = mount(<Map {...props} />);
    setImmediate(() => {
      component.update();
      done();
    });
    expect(component.childAt(2).name()).toEqual('MapControllers');
  });

  it('test Map component context', (done) => {
    const component = shallow(<Map {...props} />);
    const context = component.children().find({ value: {} });
    if (!context.debug()) done.fail(new Error('Context not found'));
    done();
  });
});
