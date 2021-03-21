import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Card, Col, Empty } from 'antd';

import * as issuesSelectors from '../store/issues/reducer';
import * as issuesActions from '../store/issues/actions';
import SearchBar from '../component/SearchBar';

export class Issues extends Component {
  constructor(props) {
    super(props);
    this.onSearch = this.onSearch.bind(this);
  }
  async onSearch(value) {
    const { getRepoIssues } = this.props;
    await getRepoIssues({ repoName: value, state: 'OPEN', pageNum: 20 });
  }

  render() {
    const issues = this.props.issues;
    const issuesList =
      issues &&
      issues.map((issue) => {
        return (
          <Card key={issue.node.id} style={{ marginTop: '1em' }}>
            <p>{issue.node.title}</p>
          </Card>
        );
      });
    return (
      <Col>
        <SearchBar
          placeholderText="Search repository"
          enterButtonText="Search"
          onSearch={this.onSearch}
          style={{ marginTop: '1em' }}
        />
        {issuesList || <Empty />}
      </Col>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    issues: issuesSelectors.getIssues(state),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getRepoIssues: issuesActions.getRepoIssuesAction,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Issues);
