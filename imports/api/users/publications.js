// Publications to the client

import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';

if (Meteor.isServer) {
  // all users publication (admin only)
  Meteor.publish('users.all', function() {
    if (Roles.userIsInRole(this.userId, 'admin')) {
      return Meteor.users.find();
    }
    return this.ready();
  });

  // current logged in user publication
  Meteor.publish('user', function() {
    if (this.userId) {
      return Meteor.users.find(
        { _id: this.userId },
        {
          fields: {
            emails: 1,
            profile: 1,
            status: 1,
            name: 1,
          },
        }
      );
    }
    return this.ready();
  });

  // example same location users publication
  Meteor.publish('users.sameZip', function() {
    if (this.userId) {
      const user = Meteor.users.findOne(this.userId);
      // if (user.friendIds) {
      return Meteor.users.find(
        { zip: user.zip },
        {
          fields: {
            emails: 1,
            profile: 1,
            status: 1,
            name: 1,
          },
        }
      );
      // }
      // return this.ready();
    }
    return this.ready();
  });
}
