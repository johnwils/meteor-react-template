/**
 * Accounts Setup
 */

import { Accounts } from 'meteor/accounts-base';
import Counters from '../../api/counters/counters.js';

Accounts.onCreateUser((options, user) => {
  // init counter at 0
  Counters.insert({
    _id: user._id,
    count: Number(0),
  });

  // Add userType info in user document
  console.log('inside onCreateUser');
  const userWithTypeInfo = { ...user, userType: options.profile.userType };

  return userWithTypeInfo;
});
