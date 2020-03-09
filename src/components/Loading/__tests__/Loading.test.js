import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import Loading from '..';

describe('test Loading component', () => {
  it('renders without crashing', () => {
    const loading = shallow(<Loading />);

    expect(toJson(loading)).toMatchSnapshot();
  });
});
