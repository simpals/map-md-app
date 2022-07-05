import 'jsdom-global/register';
import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import ZoomControl from '../ZoomControl';
import { MapCtx } from '../../../contexts';

const props = {
  position: false
};

const context = {
  MapGL: {
    getZoom: jest.fn(),
    zoomTo: jest.fn()
  }
};

describe('test ZoomControl component', () => {
  it('renders without crashing', () => {
    const component = shallow(<ZoomControl {...props} />);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('test zoomIn click', () => {
    const component = mount(
      <MapCtx.Provider value={context}>
        <ZoomControl {...props} />
      </MapCtx.Provider>
    );
    component.find('button').first().simulate('click');
  });

  it('test zoomOut click', () => {
    const component = mount(
      <MapCtx.Provider value={context}>
        <ZoomControl {...props} />
      </MapCtx.Provider>
    );
    component.find('button').last().simulate('click');
  });
});
