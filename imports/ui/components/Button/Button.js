import { Meteor } from 'meteor/meteor';
import React from 'react';

import { countersIncrease } from '../../../api/counters/methods.common';

import './Button.scss';

const handlePress = () => countersIncrease.call({ id: Meteor.userId() });

const Button = () => (
  <button className="btn btn-secondary" onClick={handlePress}>
    Click Me
  </button>
);

export default Button;
