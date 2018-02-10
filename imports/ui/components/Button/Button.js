import { Meteor } from 'meteor/meteor';
import React from 'react';

import './Button.scss';

const handlePress = () => Meteor.call('counters.increase', Meteor.userId());

const Button = () => (
  <button className="btn btn-secondary" onClick={handlePress}>
    Click Me
  </button>
);

export default Button;
