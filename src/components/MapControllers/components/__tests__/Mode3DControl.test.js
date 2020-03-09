import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Mode3DControl from '../Mode3DControl';
import { MapCtx } from '../../../contexts';

const context = {
  MapGL: {
    on: jest.fn(),
    once: jest.fn(),
    getPitch: jest.fn(),
  },
  style: 'map',
};

const props = {
  disable3DSatelite: false,
  disable3DMode: false,
  position: false
};

describe('test Mode3DControl component', () => {
  it('test Mode3DControl mount', (done) => {
    const component = mount(
      <MapCtx.Provider value={context}>
        <Mode3DControl {...props} />
      </MapCtx.Provider>
    );
    if (!component) done.fail(new Error('Mount fail'));
    done();
  });

  it('test Mode3DControl matchSnapshot', () => {
    const component = shallow(
      <MapCtx.Provider value={context}>
        <Mode3DControl {...props} />
      </MapCtx.Provider>
    );
    expect(toJson(component)).toMatchSnapshot();
  });
});
