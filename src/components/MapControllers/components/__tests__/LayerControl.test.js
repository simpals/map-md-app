import 'jsdom-global/register';
import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import LayerControl from '../LayerControl';
import { MapCtx } from '../../../contexts';

const setApiKey = ''; // API key
const ENCODE = Buffer.from(`${setApiKey}:pashalka`).toString('base64');
const AUTHORIZATION = `Basic ${ENCODE}`;

const context = {
  MapGL: {

  },
  authorization: AUTHORIZATION,
  style: 'map',
  changeStyle: jest.fn()
};

const props = {
  disable3DSatelite: false,
  disable3DMode: false,
  mapImages: []
};

describe('test LayerControl component', () => {
  it('test LayerControl mount', (done) => {
    const component = mount(
      <MapCtx.Provider value={context}>
        <LayerControl {...props} />
      </MapCtx.Provider>
    );
    if (!component) done.fail(new Error('Mount fail'));
    done();
  });

  it('test LayerControl matchSnapshot', () => {
    const component = shallow(<LayerControl {...props} />);
    expect(toJson(component)).toMatchSnapshot();
  });
});
