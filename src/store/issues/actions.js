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
    } catch (error) {
      console.error(error);
    }
  };
}
