// Test Tag
import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import * as reducers from '../../store/reducers';

import * as issuesActionTypes from '../../store/issues/actionTypes';

import Tag from '../Tag';

describe('containers/Tag', () => {
  let store;

  beforeEach(() => {
    store = createStore(combineReducers(reducers), applyMiddleware(thunk));
  });

  it('renders without crashing', () => {
    shallow(
      <Provider store={store}>
        <BrowserRouter>
          <Tag path="owner/repo-name" issueState="OPEN" />
        </BrowserRouter>
      </Provider>
    );
  });

  it('renders tags correctly', () => {
    store.dispatch({
      type: issuesActionTypes.GET_LABELS,
      labels: [
        {
          node: {
            name: 'bugs',
          },
        },
      ],
    });
    const wrapper = mount(
      <Provider store={store}>
        <BrowserRouter>
          <Tag path="owner/repo-name" issueState="OPEN" />
        </BrowserRouter>
      </Provider>
    );
    expect(wrapper.text()).toContain('bugs');
    expect(wrapper.text()).toContain('Issue Labels:');
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });
});
