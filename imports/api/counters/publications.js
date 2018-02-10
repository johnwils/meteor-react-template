// All related publications for this api

import { Meteor } from 'meteor/meteor';
import Counters from './counters.js';

Meteor.publish('counters.all', function() {
  return Counters.find();
});

Meteor.publish('counters.user', function() {
  return Counters.find({ _id: this.userId });
});
