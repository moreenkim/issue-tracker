import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row, Col, Empty, Select, List } from 'antd';

import * as issuesSelectors from '../store/issues/reducer';
import * as issuesActions from '../store/issues/actions';
import SearchBar from '../component/SearchBar';
import Spinner from '../component/Spinner';
import RepoTags from './Tag';

export class Issues extends Component {
  constructor(props) {
    super(props);
    this.state = {
      issueState: 'OPEN',
      searchVal: '',
    };
    this.onSearch = this.onSearch.bind(this);
  }

  async onSearch(value) {
    const {
      getRepoIssues,
      setLoading,
      selectedLabels,
      setSelectedLabels,
      setLabels,
    } = this.props;
    const { issueState } = this.state;
    // reset labels when searched value is cleared
    if (value === '') {
      setLabels([]);
      setSelectedLabels([]);
    }
    // set loading to true
    setLoading(true);
    // update search value
    this.setState({
      searchVal: value,
    });
    // get issues by repo name and issue state
    await getRepoIssues({
      path: value,
      state: issueState,
      filters:
        selectedLabels.asMutable().length > 0 ? { labels: selectedLabels } : {},
    });
  }

  handleChange = async (value) => {
    const { searchVal } = this.state;
    const { getRepoIssues, setLoading, selectedLabels } = this.props;
    this.setState({
      issueState: value,
    });

    // set loading to true
    setLoading(true);
    // get issues by repo name and issue state
    await getRepoIssues({
      path: searchVal,
      state: value,
      pageNum: 20,
      filters:
        selectedLabels.asMutable().length > 0 ? { labels: selectedLabels } : {},
    });
  };

  render() {
    const { loading, labels } = this.props;
    const { searchVal, issueState } = this.state;
    const { Option } = Select;
    const issues = this.props.issues.asMutable();

    const issuesList = issues.length > 0 && (
      <List
        bordered
        dataSource={issues}
        renderItem={(item) => (
          <List.Item key={item.node.id}>{item.node.title}</List.Item>
        )}
      />
    );

    const displayIssues = !loading && issuesList;
    const displayLabels = labels.asMutable().length > 0;

    return (
      <Col style={{ marginTop: '1em' }}>
        <Row>
          <Col span={14}>
            <SearchBar
              style={{ width: '100%' }}
              placeholderText="Enter repository url e.g. owner/repository-name"
              enterButtonText="Search"
              onSearch={this.onSearch}
            />
          </Col>
          <Col span={10}>
            <Row>
              <Col span={14}>
                <span
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    padding: '.6em 0',
                    fontSize: '15px',
                  }}
                >
                  Filter Issues by Status
                </span>
              </Col>
              <Col span={10}>
                <Select
                  defaultValue="OPEN"
                  style={{ width: '100%' }}
                  allowClear
                  size="large"
                  onChange={this.handleChange}
                >
                  <Option value="OPEN">Open</Option>
                  <Option value="CLOSED">Closed</Option>
                </Select>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row style={{ marginTop: '1em' }} gutter={[16, 16]}>
          <Col span={displayLabels ? 16 : 24}>
            {/* if loading is true, render spinner */}
            {loading ? <Spinner /> : null}
            {/* if loading is false and issueList is true, render issueList */}
            {displayIssues && issuesList}
            {/* if loading and issueList are false, render Empty */}
            {!loading && !issuesList && <Empty />}
          </Col>
          {(displayIssues || displayLabels) && (
            <Col span={8}>
              <RepoTags path={searchVal} issueState={issueState} />
            </Col>
          )}
        </Row>
      </Col>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    issues: issuesSelectors.getIssues(state),
    loading: issuesSelectors.getLoading(state),
    labels: issuesSelectors.getLabels(state),
    selectedLabels: issuesSelectors.getSelectedLabels(state),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getRepoIssues: issuesActions.getRepoIssuesAction,
      setLoading: issuesActions.setLoadingAction,
      setLabels: issuesActions.setLabelsAction,
      setSelectedLabels: issuesActions.setSelectedLabelsAction,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Issues);
