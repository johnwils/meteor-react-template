// Publications send to the client

import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import Issues from './issues';

if (Meteor.isServer) {
  Meteor.publish('issues.all', function() {
    if (Roles.userIsInRole(this.userId, 'admin')) {
      return Issues.find();
    }
    return this.ready();
  });

  Meteor.publish('issues', function() {
    if (!this.userId) {
      return this.ready();
    }
    return Issues.find();
  });

  Meteor.publish('issues.samezip', function() {
    if (!this.userId) {
      return this.ready();
    }
    return Issues.find({ location: Meteor.users.findOne(this.userId).zip });
  });
}
