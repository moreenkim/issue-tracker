import axios from 'axios';
import IssuesService from '../issues';

jest.mock('axios');

describe('services/issues', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should fetch issues', async () => {
    const responseData = {
      data: {
        data: {
          repository: {
            issues: {
              edges: [
                {
                  node: {
                    id: 'id',
                    title: 'title',
                  },
                },
              ],
            },
          },
        },
      },
    };
    axios.create.mockImplementationOnce(
      jest.fn(function () {
        return this;
      })
    );
    axios.post.mockImplementationOnce(() => Promise.resolve(responseData));
    await expect(
      IssuesService.getRepoIssues({
        path: 'owner/repo-name',
      })
    ).resolves.toEqual([
      {
        node: {
          id: 'id',
          title: 'title',
        },
      },
    ]);
  });

  it('should fetch issues and return an empty array', async () => {
    const responseData = {
      data: {
        data: {
          repository: null,
        },
      },
    };
    axios.create.mockImplementationOnce(
      jest.fn(function () {
        return this;
      })
    );
    axios.post.mockImplementationOnce(() => Promise.resolve(responseData));
    await expect(
      IssuesService.getRepoIssues({
        path: 'owner/repo-name',
      })
    ).resolves.toEqual([]);
  });

  it('should fetch issues and return an empty array when path is empty', async () => {
    await expect(
      IssuesService.getRepoIssues({
        path: '',
      })
    ).resolves.toEqual([]);
  });

  it('should fetch labels', async () => {
    const responseData = {
      data: {
        data: {
          repository: {
            labels: {
              edges: [
                {
                  node: {
                    name: 'name',
                  },
                },
              ],
            },
          },
        },
      },
    };
    axios.create.mockImplementationOnce(
      jest.fn(function () {
        return this;
      })
    );
    axios.post.mockImplementationOnce(() => Promise.resolve(responseData));
    await expect(
      IssuesService.getRepoLabels({
        path: 'owner/repo-name',
      })
    ).resolves.toEqual([
      {
        node: {
          name: 'name',
        },
      },
    ]);
  });

  it('should fetch labels and return an empty array', async () => {
    const responseData = {
      data: {
        data: {
          repository: null,
        },
      },
    };
    axios.create.mockImplementationOnce(
      jest.fn(function () {
        return this;
      })
    );
    axios.post.mockImplementationOnce(() => Promise.resolve(responseData));
    await expect(
      IssuesService.getRepoLabels({
        path: 'owner/repo-name',
      })
    ).resolves.toEqual([]);
  });

  it('should fetch labels and return an empty array when path is empty', async () => {
    await expect(
      IssuesService.getRepoLabels({
        path: '',
      })
    ).resolves.toEqual([]);
  });
});
