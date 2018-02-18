// Publications to the client

import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';

Meteor.publish('users.all', function() {
  if (Roles.userIsInRole(this.userId, 'admin')) {
    return Meteor.users.find();
  }
  return this.ready();
});
