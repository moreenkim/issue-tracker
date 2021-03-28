import Immutable from 'seamless-immutable';
import { Reducer } from 'redux-testkit';
import * as actionTypes from '../actionTypes';

import issuesReducer from '../reducer';

const initialState = {
  issues: [],
  loading: false,
  labels: [],
  selectedLabels: [],
};

describe('store/issues/reducer', () => {
  it('should have initial state', () => {
    expect(issuesReducer()).toEqual(initialState);
  });

  it('should not affect state', () => {
    Reducer(issuesReducer)
      .expect({ type: 'NOT_EXISTING' })
      .toReturnState(initialState);
  });

  it('should store fetched issues', () => {
    const issues = [
      {
        node: {
          id: 'id',
          title: 'title',
        },
      },
    ];
    const action = {
      type: actionTypes.GET_ISSUES,
      issues,
    };
    Reducer(issuesReducer)
      .expect(action)
      .toReturnState({ ...initialState, issues: issues });
  });

  it('should store fetched issues and override existing issues', () => {
    const issues = [
      {
        node: {
          id: 'id',
          title: 'title2',
        },
      },
    ];
    const existingState = Immutable({
      ...initialState,
      issues: [
        {
          node: {
            id: 'id',
            title: 'title1',
          },
        },
      ],
    });

    const action = {
      type: actionTypes.GET_ISSUES,
      issues,
    };
    Reducer(issuesReducer)
      .withState(existingState)
      .expect(action)
      .toReturnState({ ...initialState, issues });
  });

  it('should store fetched labels', () => {
    const labels = [
      {
        node: {
          name: 'name',
        },
      },
    ];
    const action = {
      type: actionTypes.GET_LABELS,
      labels,
    };
    Reducer(issuesReducer)
      .expect(action)
      .toReturnState({ ...initialState, labels: labels });
  });

  it('should store fetched labels and override existing labels', () => {
    const labels = [
      {
        node: {
          name: 'name2',
        },
      },
    ];
    const existingState = Immutable({
      ...initialState,
      labels: [
        {
          node: {
            name: 'name1',
          },
        },
      ],
    });

    const action = {
      type: actionTypes.GET_LABELS,
      labels,
    };
    Reducer(issuesReducer)
      .withState(existingState)
      .expect(action)
      .toReturnState({ ...initialState, labels });
  });

  it('should store fetched selected labels', () => {
    const selectedLabels = ['good first issue'];
    const action = {
      type: actionTypes.SET_SELECTED_LABELS,
      selectedLabels,
    };
    Reducer(issuesReducer)
      .expect(action)
      .toReturnState({ ...initialState, selectedLabels: selectedLabels });
  });

  it('should store fetched selected labels and override existing selected labels', () => {
    const selectedLabels = ['good first issue'];
    const existingState = Immutable({
      ...initialState,
      selectedLabels: ['bug'],
    });

    const action = {
      type: actionTypes.SET_SELECTED_LABELS,
      selectedLabels,
    };
    Reducer(issuesReducer)
      .withState(existingState)
      .expect(action)
      .toReturnState({ ...initialState, selectedLabels });
  });

  it('should set loading status', () => {
    const loading = true;
    const action = {
      type: actionTypes.SET_LOADING,
      loading,
    };
    Reducer(issuesReducer)
      .expect(action)
      .toReturnState({ ...initialState, loading: loading });
  });

  it('should set loading and override existing loading status', () => {
    const loading = true;
    const existingState = Immutable({
      ...initialState,
      loading: false,
    });

    const action = {
      type: actionTypes.SET_LOADING,
      loading,
    };
    Reducer(issuesReducer)
      .withState(existingState)
      .expect(action)
      .toReturnState({ ...initialState, loading });
  });
});
