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

class Profile extends React.Component {
  componentWillMount() {
    if (!this.props.loggedIn) {
      return this.props.history.push('/login');
    }
  }

  shouldComponentUpdate(nextProps) {
    if (!nextProps.loggedIn) {
      nextProps.history.push('/login');
      return false;
    }
    return true;
  }

  render() {
    const {
      loggedIn,
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
    if (!loggedIn) {
      return null;
    }
    return (
      <div className="profile-page">
        <h1>Profile Page</h1>
        <Button target="userId" type="primary" title="Click for User Info" />
        {countersReady && (
          <Modal
            target="userId"
            title="User Info"
            body={Meteor.userId()}
            counter={counter}
          />
        )}
        <hr />
        {countersReady && <Text count={counter.count} />}
        <AddCountButton />
      </div>
    );
  }
}

Profile.defaultProps = {
  // users: null, remote example (if using ddp)
  counter: null,
};

Profile.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  // remote example (if using ddp)
  // usersReady: PropTypes.bool.isRequired,
  // users: Meteor.user() ? PropTypes.array.isRequired : () => null,
  countersReady: PropTypes.bool.isRequired,
  counter: PropTypes.shape({
    _id: PropTypes.string,
    count: PropTypes.number,
  }),
};

export default withTracker(() => {
  // remote example (if using ddp)
  /*
  const usersSub = Remote.subscribe('users.friends'); // publication needs to be set on remote server
  const users = Users.find().fetch();
  const usersReady = usersSub.ready() && !!users;
  */

  // counters example
  const countersSub = Meteor.subscribe('counters.user');
  const counter = Counters.findOne({ _id: Meteor.userId() });
  const countersReady = countersSub.ready() && !!counter;
  return {
    // remote example (if using ddp)
    // usersReady,
    // users,
    countersReady,
    counter,
  };
})(Profile);
