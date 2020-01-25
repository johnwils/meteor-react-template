/**
 * Deny write access on users collection from client
 */

import { Meteor } from 'meteor/meteor';

// This fixes default writable profile field:
// https://guide.meteor.com/accounts.html#dont-use-profile
Meteor.users.deny({
  update() {
    return true;
  },
});

Meteor.startup(() => {
  const roles = ['admin', 'user'];
  roles.forEach(role => Roles.createRole(role, { unlessExists: true }));
});
