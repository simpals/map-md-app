import 'jsdom-global/register';
import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import UserLocControl from '../UserLocControl';
import { MapCtx } from '../../../contexts';

const context = {
  userLocation: {
    once: jest.fn(),
    trigger: jest.fn()
  }
};

describe('test UserLocControl component', () => {
  it('renders without crashing', () => {
    const component = shallow(<UserLocControl />);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('test UserLocation click', () => {
    const component = mount(
      <MapCtx.Provider value={context}>
        <UserLocControl />
      </MapCtx.Provider>
    );
    component.find('button').simulate('click');
  });
});
