import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';

import './AssignedIssues.scss';
import { issueInsert } from '../../../api/issues/issues.js';

class AssignedIssues extends React.Component {
  componentWillMount() {
    const { loggedIn, history } = this.props;
    if (!loggedIn) {
      return history.push('/login');
    }
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.loggedIn) {
      return true;
    }
    return false;
    // return true
  }

  renderIssues = () => {
    const { assignedIssues } = this.props;
    const listOfIssues = assignedIssues.map(issue => (
      <li key={issue._id} className="list-group-item">
        {issue.text}
      </li>
    ));
    return listOfIssues;
  };

  // getAssignedTasks() {
  //   return Meteor.methods('getTasksAssignedTo', Meteor.userId())
  // }
  handleSubmit = event => {
    event.preventDefault();
    const issueText = this.issueTextInput.value.trim();
    Meteor.call('issues.insert', issueText);
    this.issueTextInput.value = '';
  };

  render() {
    return (
      <div className="AssignedIssues-page">
        <h1>AssignedIssues Page</h1>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input
            type="text"
            ref={c => {
              this.issueTextInput = c;
            }}
            placeholder="Enter issue"
          />
        </form>
        <ul className="list-group">{this.renderIssues()}</ul>
      </div>
    );
  }
}

AssignedIssues.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  assignedIssues: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default AssignedIssues;
