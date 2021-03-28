// Test Issues
import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import * as reducers from '../../store/reducers';

import * as issuesActionTypes from '../../store/issues/actionTypes';

import Issues from '../Issues';

describe('containers/Issues', () => {
  let store;

  beforeEach(() => {
    store = createStore(combineReducers(reducers), applyMiddleware(thunk));
  });

  it('renders without crashing', () => {
    shallow(
      <Provider store={store}>
        <BrowserRouter>
          <Issues />
        </BrowserRouter>
      </Provider>
    );
  });

  it('renders issues and tags correctly', () => {
    // Fixes TypeError: window.matchMedia is not a function
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });

    store.dispatch({
      type: issuesActionTypes.GET_ISSUES,
      issues: [
        {
          node: {
            id: 'id',
            title: 'title',
          },
        },
      ],
    });
    store.dispatch({
      type: issuesActionTypes.SET_LOADING,
      loading: false,
    });
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
          <Issues />
        </BrowserRouter>
      </Provider>
    );
    expect(wrapper.text()).toContain(
      'SearchFilter Issues by StatusOpentitleIssue Labels:bugs'
    );
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });
});
