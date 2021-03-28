import IssueService from '../../services/issues';
import * as types from './actionTypes';

export function getRepoIssuesAction(payload) {
  return async (dispatch) => {
    try {
      const issues = await IssueService.getRepoIssues(payload);

      dispatch({
        type: types.GET_ISSUES,
        issues,
      });
      dispatch({
        type: types.SET_LOADING,
        loading: false,
      });
    } catch (error) {
      dispatch({
        type: types.SET_LOADING,
        loading: false,
      });
      console.error(error);
    }
  };
}

export function getRepoLabelsAction(payload) {
  return async (dispatch) => {
    try {
      const labels = await IssueService.getRepoLabels(payload);

      dispatch({
        type: types.GET_LABELS,
        labels,
      });
    } catch (error) {
      console.error(error);
    }
  };
}

export function setLoadingAction(status) {
  return async (dispatch) => {
    dispatch({
      type: types.SET_LOADING,
      loading: status,
    });
  };
}

export function setSelectedLabelsAction(selectedLabels) {
  return async (dispatch) => {
    dispatch({
      type: types.SET_SELECTED_LABELS,
      selectedLabels,
    });
  };
}

export function setLabelsAction(labels) {
  return async (dispatch) => {
    dispatch({
      type: types.GET_LABELS,
      labels,
    });
  };
}
