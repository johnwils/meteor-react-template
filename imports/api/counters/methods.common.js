/**
 * Shared client and server meteor methods
 *
 * These methods provide optimistic UI
 * https://guide.meteor.com/ui-ux.html#optimistic-ui
 * Sensitive data should not be put in here
 */

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Counters } from './counters.js';

const authCheck = (serverId, id) => !serverId === id;

Meteor.methods({
  'counters.insert'() {
    console.log('Meteor.userId()', Meteor.userId());
    return Counters.insert({
      _id: Meteor.userId(),
      count: Number(0),
    });
  },
  'counters.increase'(id) {
    check(id, String);
    if (authCheck(this.userId, id)) {
      throw new Meteor.Error('not authorized', 'id mismatch');
    }
    return Counters.update(
      { _id: id },
      {
        $inc: {
          count: 1,
        },
      },
    );
  },
});
