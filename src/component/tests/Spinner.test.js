// Test Spinner
import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import Spinner from '../Spinner';

describe('components/Spinner', () => {
  it('renders without crashing', () => {
    shallow(<Spinner />);
  });

  it('renders spinner correctly', () => {
    const wrapper = mount(<Spinner />);
    expect(toJson()).toMatchSnapshot();
    wrapper.unmount();
  });
});
