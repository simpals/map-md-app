import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import Error from '..';

const testError = Error('TestMessage', 'TestFile', 'line 1:1');
let component;

beforeEach(() => {
  component = mount(<Error />);
});

describe('test Error component', () => {
  it('renders without crashing', () => {
    expect(toJson(component)).toMatchSnapshot();
  });

  it('has default props', () => {
    expect(component.props().error).toEqual(null);
  });

  it('has props', () => {
    component.setProps({
      error: testError
    });
    expect(component.props().error).toEqual(testError);
  });
});
