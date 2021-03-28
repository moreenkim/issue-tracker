import React, { Component } from 'react';
import { Tag, Col } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as issuesSelectors from '../store/issues/reducer';
import * as issuesActions from '../store/issues/actions';

class RepoTags extends Component {
  constructor(props) {
    super(props);
    this.state = {
      path: props.path,
    };
  }

  async componentDidMount() {
    const { getRepoLabels, labels } = this.props;
    const { path } = this.state;
    // only get repository labels when labels array is empty
    if (labels.asMutable().length === 0) {
      await getRepoLabels({ path });
    }
  }

  async handleChange(label, checked) {
    const {
      issueState,
      path,
      getRepoIssues,
      setSelectedLabels,
      selectedLabels,
    } = this.props;
    const nextselectedLabels = checked
      ? [...selectedLabels, label.node.name]
      : selectedLabels.filter((t) => t !== label.node.name);
    setSelectedLabels(nextselectedLabels);
    // get issues by repo name and issue state
    await getRepoIssues({
      path,
      state: issueState,
      filters: nextselectedLabels.length ? { labels: nextselectedLabels } : {},
    });
  }

  render() {
    const { CheckableTag } = Tag;
    const { labels, selectedLabels } = this.props;
    return (
      <>
        <Col>
          <span style={{ fontSize: '15px' }}>Issue Labels:</span>
        </Col>
        <Col>
          {labels.asMutable().length > 0 ? (
            labels.map((label) => (
              <CheckableTag
                style={{ fontSize: '15px' }}
                key={label.node.name}
                checked={selectedLabels.indexOf(label.node.name) > -1}
                onChange={(checked) => this.handleChange(label, checked)}
              >
                {label.node.name}
              </CheckableTag>
            ))
          ) : (
            <span>No Labels</span>
          )}
        </Col>
      </>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    labels: issuesSelectors.getLabels(state),
    selectedLabels: issuesSelectors.getSelectedLabels(state),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getRepoLabels: issuesActions.getRepoLabelsAction,
      getRepoIssues: issuesActions.getRepoIssuesAction,
      setSelectedLabels: issuesActions.setSelectedLabelsAction,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(RepoTags);
