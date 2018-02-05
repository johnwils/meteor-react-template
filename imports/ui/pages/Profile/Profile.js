import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import React from 'react';
import PropTypes from 'prop-types';
import { Counters } from '../../../api/counters/counters';

// components
import Modal, { Button } from '../../components/Modal/Modal';
import { default as AddCountButton } from '../../components/Button';
import Text from '../../components/Text';

import './Profile.scss';

const Profile = ({ userId, counterExists, counter, subReady }) => {
  return (
    <div className="profile-page">
      <h1>Profile Page</h1>
      <Button target="userId" type="primary" title="Click for User Info" />
      <Modal target="userId" title="User Info" body={userId} counter={counter} />
      <hr/>
      {counterExists && <Text count={counter.count} />}
      <AddCountButton />
    </div>
  );
};

Profile.propTypes = {
  counter: PropTypes.object,
  counterExists: PropTypes.bool.isRequired,
  userId: PropTypes.string.isRequired,
};

export default withTracker(({ userId }) => {
  const countersHandle = Meteor.subscribe('counters.all');
  const loading = !countersHandle.ready();
  const counter = Counters.findOne(userId);
  const counterExists = !loading && !!counter;
  return {
    counter,
    counterExists,
  };
})(Profile);
