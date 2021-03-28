// Test SearchBar
import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import SearchBar from '../SearchBar';

describe('components/SearchBar', () => {
  const props = {
    enterButtonText: 'Search',
    placeholderText: 'Enter repository url e.g. owner/repository-name',
    onSearch: () => {},
  };
  it('renders without crashing', () => {
    shallow(<SearchBar {...props} />);
  });

  it('renders SearchBar correctly', () => {
    const wrapper = mount(<SearchBar {...props} />);
    expect(toJson()).toMatchSnapshot();
    wrapper.unmount();
  });
});
