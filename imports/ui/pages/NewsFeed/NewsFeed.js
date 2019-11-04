import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import React from 'react';
import Issues from '../../../api/issues/issues';
import RecipeReviewCard from '../../components/Issue/Issue';
import { issueUpdate } from '../../../api/issues/methods';

// eslint-disable-next-line react/prefer-stateless-function
class NewsFeed extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   changedIssueId: 0,
    //   severity: 0,
    // };
  }

  onChange = (issueId, ev, val) => {
    // console.log(ev.target);
    // console.log(val);
    // console.log('IN newsfeed ', issueId);
    // this.setState({
    //   changedIssueId: issueId,
    //   severity: val,
    // });
    issueUpdate.call({ issueId, severity: val });
  };

  //   onDragStop = () => {};

  render() {
    const { feedIssues } = this.props;

    return (
      <React.Fragment>
        {feedIssues.map(issue => (
          // eslint-disable-next-line no-unused-expressions
          <div key={issue._id} className="container">
            <RecipeReviewCard
              issueId={issue._id}
              issue={issue}
              onDragStop={this.onDragStop}
              onChange={this.onChange}
            />
          </div>
        ))}
      </React.Fragment>
    );
  }
}

NewsFeed.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  issuesReady: PropTypes.bool.isRequired,
  feedIssues: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default withTracker(() => {
  // remote example (if using ddp)
  /*
    const usersSub = Remote.subscribe('users.friends'); // publication needs to be set on remote server
    const users = Users.find().fetch();
    const usersReady = usersSub.ready() && !!users;
    */

  // issues example
  const issuesSub = Meteor.subscribe('issues.samezip');
  const feedIssues = Issues.find().fetch();
  console.log('FeedIssues', feedIssues);
  const issuesReady = issuesSub.ready() && !!feedIssues;

  return {
    // remote example (if using ddp)
    // usersReady,
    // users,

    issuesReady,
    feedIssues,
  };
})(NewsFeed);
