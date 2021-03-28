import { Thunk } from 'redux-testkit';

import * as actionTypes from '../actionTypes';
import * as actions from '../actions';
import IssueService from '../../../services/issues';

jest.mock('../../../services/issues');

describe('store/actions', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should fetch repo issues from the server', async () => {
    IssueService.getRepoIssues.mockReturnValueOnce([
      {
        node: {
          id: 'id',
          title: 'title',
        },
      },
    ]);
    const dispatches = await Thunk(actions.getRepoIssuesAction).execute(); //disp is arr
    expect(dispatches.length).toBe(2);
    expect(dispatches[0].isPlainObject()).toBe(true);
    expect(dispatches[0].getAction()).toEqual({
      type: actionTypes.GET_ISSUES,
      issues: [
        {
          node: {
            id: 'id',
            title: 'title',
          },
        },
      ],
    });
    expect(dispatches[1].isPlainObject()).toBe(true);
    expect(dispatches[1].getAction()).toEqual({
      type: actionTypes.SET_LOADING,
      loading: false,
    });
  });

  // it('should fetch issues and print error found on console', async () => {
  //   IssueService.getRepoIssues.mockReturnValueOnce(() => {
  //     throw new Error('oops');
  //   });
  //   console.error = jest.fn();
  //   const dispatches = await Thunk(actions.getRepoIssuesAction).execute({
  //     path: 'owner/repo-name',
  //   });
  //   expect(dispatches.length).toBe(1);
  //   expect(dispatches[0].isPlainObject()).toBe(true);
  //   expect(dispatches[0].getAction()).toEqual({
  //     type: actionTypes.SET_LOADING,
  //     loading: false,
  //   });
  //   expect(console.error).toHaveBeenCalledWith(Error('oops'));
  // });

  it('should fetch repo labels from the server', async () => {
    IssueService.getRepoLabels.mockReturnValueOnce([
      {
        node: {
          name: 'name',
        },
      },
    ]);
    const dispatches = await Thunk(actions.getRepoLabelsAction).execute(); //disp is arr
    expect(dispatches.length).toBe(1);
    expect(dispatches[0].isPlainObject()).toBe(true);
    expect(dispatches[0].getAction()).toEqual({
      type: actionTypes.GET_LABELS,
      labels: [
        {
          node: {
            name: 'name',
          },
        },
      ],
    });
  });

  // it('should fetch labels and print error found on console', async () => {
  //   IssueService.getRepoLabels.mockReturnValueOnce(() => {
  //     throw new Error('oops');
  //   });
  //   console.error = jest.fn();
  //   const dispatches = await Thunk(actions.getRepoLabelsAction).execute();
  //   expect(dispatches.length).toBe(0);
  //   expect(console.error).toHaveBeenCalledWith(Error('oops'));
  // });

  it('should set loading status', async () => {
    const dispatches = await Thunk(actions.setLoadingAction).execute(true);
    expect(dispatches.length).toBe(1);
    expect(dispatches[0].isPlainObject()).toBe(true);
    expect(dispatches[0].getAction()).toEqual({
      type: actionTypes.SET_LOADING,
      loading: true,
    });
  });

  it('should set selected labels', async () => {
    const dispatches = await Thunk(actions.setSelectedLabelsAction).execute([]);
    expect(dispatches.length).toBe(1);
    expect(dispatches[0].isPlainObject()).toBe(true);
    expect(dispatches[0].getAction()).toEqual({
      type: actionTypes.SET_SELECTED_LABELS,
      selectedLabels: [],
    });
  });

  it('should set labels', async () => {
    const dispatches = await Thunk(actions.setLabelsAction).execute([]);
    expect(dispatches.length).toBe(1);
    expect(dispatches[0].isPlainObject()).toBe(true);
    expect(dispatches[0].getAction()).toEqual({
      type: actionTypes.GET_LABELS,
      labels: [],
    });
  });
});
