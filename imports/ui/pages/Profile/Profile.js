import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import React from 'react';
import PropTypes from 'prop-types';

// collection
import Counters from '../../../api/counters/counters';

// remote example (if using ddp)
/*
import Remote from '../../../api/remote/ddp';
import Users from '../../../api/remote/users';
*/

// components
import Modal, { Button } from '../../components/Modal/Modal';
import AddCountButton from '../../components/Button';
import Text from '../../components/Text';

import './Profile.scss';

const Profile = class extends React.Component {
  componentWillMount() {
    if (!this.props.userId) {
      this.props.history.push('/login');
      return null;
    }
  }
  render() {
    const {
      userId,
      // remote example (if using ddp)
      // usersReady,
      // users,
      countersReady,
      counter,
    } = this.props;

    // eslint-disable-line
    // remote example (if using ddp)
    /*
    console.log('usersReady', usersReady);
    console.log('users', users);
    */
    if (!this.props.userId) {
      return null;
    }
    return (
      <div className="profile-page">
        <h1>Profile Page</h1>
        <Button target="userId" type="primary" title="Click for User Info" />
        {countersReady && (
          <Modal target="userId" title="User Info" body={userId} counter={counter} />
        )}
        <hr />
        {countersReady && <Text count={counter.count} />}
        <AddCountButton />
      </div>
    );
  }
};

Profile.defaultProps = {
  // users: null, remote example (if using ddp)
  userId: null,
  counter: null,
};

Profile.propTypes = {
  userId: Meteor.user() ? PropTypes.string.isRequired : () => null,
  // remote example (if using ddp)
  // usersReady: PropTypes.bool.isRequired,
  // users: Meteor.user() ? PropTypes.array.isRequired : () => null,
  countersReady: PropTypes.bool.isRequired,
  counter: Meteor.user()
    ? PropTypes.shape({
      _id: PropTypes.string,
      count: PropTypes.number,
    }).isRequired
    : () => null,
};

export default withTracker(({ userId }) => {
  // remote example (if using ddp)
  /*
  const usersSub = Remote.subscribe('users.all'); // publication needs to be set on remote server
  const users = Users.find().fetch();
  const usersReady = usersSub.ready() && !!users;
  */

  // counters example
  const countersSub = Meteor.subscribe('counters.user');
  const counter = Counters.findOne(userId);
  const countersReady = countersSub.ready() && !!counter;
  return {
    // remote example (if using ddp)
    // usersReady,
    // users,
    countersReady,
    counter,
  };
})(Profile);
