import Immutable from 'seamless-immutable';

import * as types from './actionTypes';

const initialState = Immutable({
  issues: null,
  issue: {},
});

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case types.GET_ISSUES:
      return state.merge({
        issues: action.issues,
      });
    case types.GET_ISSUE:
      return state.merge({
        issue: action.issue,
      });
    default:
      return state;
  }
}

//selectors, get data from store
export function getIssues(state) {
  return state.issues.issues;
}

export function getIssue(state) {
  return state.issues.issue;
}
