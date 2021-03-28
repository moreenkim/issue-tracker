import axios from 'axios';

class IssueService {
  authenticateUser() {
    return axios.create({
      baseURL: process.env.REACT_APP_GITHUB_GRAPHQL_API_BASE_URL,
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_GITHUB_ACESS_TOKEN}`,
      },
    });
  }

  async getRepoIssues({ path, state, pageNum, filters }) {
    // Return empty array when path is an empty string. Triggered by the search clear button.
    if (path === '') {
      return [];
    }

    const [owner, repoName] = path.split('/');
    const query = `
      query($owner: String!, $repoName: String!, $state: IssueState!, $pageNum: Int, $issueFilters: IssueFilters) {
        repository(owner: $owner, name: $repoName) {
          issues(first: $pageNum, states:[$state], filterBy: $issueFilters) {
            edges {
              node {
                id
                title
                url
                labels(first:5) {
                  edges {
                    node {
                      name
                    }
                  }
                }
              }
            }
          }
        }
    }
    `;

    const response = await this.authenticateUser().post('', {
      query,
      variables: {
        owner,
        repoName,
        state: state || 'OPEN',
        pageNum: pageNum || 20,
        issueFilters: filters || {},
      },
    });

    // return empty array if no repo found
    if (response.data.data.repository === null) {
      return [];
    }

    return response.data.data.repository.issues.edges;
  }

  async getRepoLabels({ path }) {
    // Return empty array when path is an empty string. Triggered by the search clear button.
    if (path === '') {
      return [];
    }

    const [owner, repoName] = path.split('/');
    const query = `
      query($owner: String!, $repoName: String!) {
        repository(owner: $owner, name: $repoName) {
          labels(first: 100) {
            edges {
              node {
                name
              }
            }
          }
        }
    }
    `;

    const response = await this.authenticateUser().post('', {
      query,
      variables: {
        owner,
        repoName,
      },
    });

    // return empty array if no repo found
    if (response.data.data.repository === null) {
      return [];
    }

    return response.data.data.repository.labels.edges;
  }
}

export default new IssueService();
