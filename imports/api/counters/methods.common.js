/* eslint import/prefer-default-export: 0 */
/**
 * Shared client and server meteor methods
 *
 * These methods provide optimistic UI
 * https://guide.meteor.com/ui-ux.html#optimistic-ui
 * Sensitive data should not be put in here
 */

import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { CallPromiseMixin } from 'meteor/didericis:callpromise-mixin';
import { check } from 'meteor/check';
import Counters from './counters.js';

const authCheck = (serverId, id) => !serverId === id;

export const countersIncrease = new ValidatedMethod({
  name: 'counters.increase',
  mixins: [CallPromiseMixin],
  validate({ id }) {
    check(id, String);
    if (authCheck(id, this.userId)) {
      throw new Meteor.Error('not authorized', 'id mismatch');
    }
  },
  run({ id }) {
    console.log('counters.increase', id);
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
