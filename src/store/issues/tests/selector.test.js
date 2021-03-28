import Immutable from 'seamless-immutable';
import { Selector } from 'redux-testkit';
import * as issuesReducer from '../reducer';

const emptyState = Immutable({
  issues: {
    issues: [],
    loading: false,
    labels: [],
    selectedLabels: [],
  },
});

const fullState = Immutable({
  issues: {
    issues: [
      {
        node: {
          id: 'id',
          title: 'title',
        },
      },
    ],
    loading: true,
    labels: [
      {
        node: {
          name: 'bug',
        },
      },
    ],
    selectedLabels: ['bug'],
  },
});

describe('store/tests/reducer/selectors', () => {
  it('should get issues and return empty array', () => {
    Selector(issuesReducer.getIssues).expect(emptyState).toReturn([]);
  });
  it('should get labels and return empty array', () => {
    Selector(issuesReducer.getLabels).expect(emptyState).toReturn([]);
  });
  it('should get selected labels and return empty array', () => {
    Selector(issuesReducer.getSelectedLabels).expect(emptyState).toReturn([]);
  });
  it('should get loading status and return false', () => {
    Selector(issuesReducer.getLoading).expect(emptyState).toReturn(false);
  });

  it('should return a list of issues when full state', () => {
    Selector(issuesReducer.getIssues)
      .expect(fullState)
      .toReturn(fullState.issues.issues);
  });

  it('should return a list of lables when full state', () => {
    Selector(issuesReducer.getLabels)
      .expect(fullState)
      .toReturn(fullState.issues.labels);
  });

  it('should return a list of selected labels when full state', () => {
    Selector(issuesReducer.getSelectedLabels)
      .expect(fullState)
      .toReturn(fullState.issues.selectedLabels);
  });

  it('should return loading as true when full state', () => {
    Selector(issuesReducer.getLoading)
      .expect(fullState)
      .toReturn(fullState.issues.loading);
  });
});
