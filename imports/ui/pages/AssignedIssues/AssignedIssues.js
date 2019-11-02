import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import './AssignedIssues.scss';
// import { issueInsert } from '../../../api/issues/issues.js';
import {
  issueCreate,
  issueDelete,
  issueUpdate,
} from '../../../api/issues/methods';
import Issues from '../../../api/issues/issues';
// import Users from '../../../api/users/users';

const initialState = {
  title: '',
  description: '',
  category: '',
  severity: 0,
  location: '',
  assignedTo: '',
};
class AssignedIssues extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

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

  getUser = id => {
    const owner = Meteor.users.findOne(id);
    // console.log(owner);
    return owner;
  };

  renderIssues = () => {
    const { assignedIssues } = this.props;
    const listOfIssues = assignedIssues.map(issue => (
      <div key={issue._id} className="container">
        <li className="list-group-item">
          <div className="card">
            <h5 className="card-header">{this.getUser(issue.owner).name}</h5>
            <div className="card-body">
              <h5 className="card-title">{issue.title}</h5>
              <p className="card-text">{issue.description}</p>
              <button
                type="button"
                className="btn btn-danger"
                onClick={e => this.handleRemove(e)}
              >
                Delete
              </button>
            </div>
          </div>
        </li>
      </div>
    ));
    return listOfIssues;
  };

  handleRemove = (event, issueId) => {
    event.preventDefault();
    // Meteor.call('issues.remove', issueId);
    issueDelete.call({ _id: issueId });
  };

  // getAssignedTasks() {
  //   return Meteor.methods('getTasksAssignedTo', Meteor.userId())
  // }
  handleSubmit = event => {
    event.preventDefault();
    const {
      title,
      description,
      category,
      severity,
      location,
      assignedTo,
    } = this.state;
    issueCreate.call({
      category,
      title,
      description,
      severity,
      location,
      assignedTo,
    });
    this.reset();
  };

  reset() {
    this.setState(initialState);
  }

  render() {
    return (
      <div className="container">
        <h1>AssignedIssues Page</h1>
        <div className="row">
          <div className="col">
            <section className="create-issue-form">
              <div className="card mx-auto">
                <div className="card-body">
                  <h4 className="card-title">Create Issue</h4>
                  <form onSubmit={e => this.handleSubmit(e)}>
                    <div className="form-group">
                      <label htmlFor="issueTitle">Title</label>
                      <input
                        type="text"
                        className="form-control"
                        id="issueTitle"
                        name="issueTitle"
                        placeholder="Issue Title"
                        value={this.state.title}
                        onChange={e => this.setState({ title: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="issueSeverity">Severity</label>
                      <input
                        type="number"
                        className="form-control"
                        id="issueSeverity"
                        placeholder="Issue Severity"
                        value={this.state.severity}
                        onChange={e =>
                          this.setState({
                            severity: parseInt(e.target.value, 10),
                          })
                        }
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="issueLocation">Location</label>
                      <input
                        type="text"
                        className="form-control"
                        id="issueLocation"
                        placeholder="Issue Location"
                        value={this.state.location}
                        onChange={e =>
                          this.setState({ location: e.target.value })
                        }
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="assignedTo">Assigned To</label>
                      <input
                        type="text"
                        className="form-control"
                        id="assignedTo"
                        placeholder="Assign to"
                        value={this.state.assignedTo}
                        onChange={e =>
                          this.setState({ assignedTo: e.target.value })
                        }
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="issueCategory">Category</label>
                      <select
                        className="form-control"
                        name="issueCategory"
                        value={this.state.category}
                        onChange={e =>
                          this.setState({ category: e.target.value })
                        }
                        required
                      >
                        <option value="" disabled selected>
                          Select Category
                        </option>
                        <option value="roads">roads</option>
                        <option value="water">water</option>
                        <option value="electricity">electricity</option>
                        <option value="traffic">traffic</option>
                        <option value="school">school</option>
                        <option value="university">university</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="issueDescription">Description</label>
                      <textarea
                        className="form-control"
                        id="issueDescription"
                        rows="3"
                        value={this.state.description}
                        onChange={e =>
                          this.setState({ description: e.target.value })
                        }
                      />
                    </div>

                    <div className="form-group no-margin">
                      <button
                        type="submit"
                        className="btn btn-primary btn-block mb-2"
                      >
                        Create Issue
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </section>
          </div>
          <div className="col">
            <section className="issue-list">
              <div className="card" style={{ width: '18rem' }}>
                <ul className="list-group list-group-flush">
                  {this.renderIssues()}
                </ul>
              </div>
            </section>
          </div>
        </div>
      </div>
    );
  }
}

AssignedIssues.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  issuesReady: PropTypes.bool.isRequired,
  assignedIssues: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default withTracker(() => {
  // remote example (if using ddp)
  /*
  const usersSub = Remote.subscribe('users.friends'); // publication needs to be set on remote server
  const users = Users.find().fetch();
  const usersReady = usersSub.ready() && !!users;
  */

  // counters example
  const issuesSub = Meteor.subscribe('issues.user');
  const assignedIssues = Issues.find({ owner: Meteor.userId() }).fetch();
  const issuesReady = issuesSub.ready() && !!assignedIssues;
  Meteor.subscribe('user.sameZip');

  return {
    // remote example (if using ddp)
    // usersReady,
    // users,
    issuesReady,
    assignedIssues,
  };
})(AssignedIssues);
