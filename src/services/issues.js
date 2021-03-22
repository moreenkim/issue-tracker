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

  async getRepoIssues({ repoName, state, pageNum }) {
    const owner = process.env.REACT_APP_GITHUB_USERNAME;
    const query = `
      query($owner: String!, $repoName: String!, $state: IssueState!, $pageNum: Int) {
        repository(owner: $owner, name: $repoName) {
          issues(first: $pageNum, states:[$state]) {
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
      },
    });

    return response.data.data.repository.issues.edges;
  }
}

export default new IssueService();
