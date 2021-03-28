import Immutable from 'seamless-immutable';

import * as types from './actionTypes';

const initialState = Immutable({
  issues: [],
  loading: false,
  labels: [],
  selectedLabels: [],
});

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case types.GET_ISSUES:
      return state.merge({
        issues: action.issues,
      });
    case types.GET_LABELS:
      return state.merge({
        labels: action.labels,
      });
    case types.SET_SELECTED_LABELS:
      return state.merge({
        selectedLabels: action.selectedLabels,
      });
    case types.SET_LOADING:
      return state.merge({
        loading: action.loading,
      });
    default:
      return state;
  }
}

//selectors, get data from store
export function getIssues(state) {
  return state.issues.issues;
}

export function getLabels(state) {
  return state.issues.labels;
}

export function getSelectedLabels(state) {
  return state.issues.selectedLabels;
}

export function getLoading(state) {
  return state.issues.loading;
}
