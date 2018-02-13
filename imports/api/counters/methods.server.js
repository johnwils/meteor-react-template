/* eslint import/prefer-default-export: 0 */
// Private server methods

import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { CallPromiseMixin } from 'meteor/didericis:callpromise-mixin';
// import { check } from 'meteor/check';
import Counters from './counters.js';

export const countersInsert = new ValidatedMethod({
  name: 'counters.insert',
  mixins: [CallPromiseMixin],
  validate: null,
  run() {
    console.log('counters.insert', this.userId);
    return Counters.insert({
      _id: Meteor.userId(),
      count: Number(0),
    });
  },
});
