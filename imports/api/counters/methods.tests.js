/* eslint-disable no-undef */
// Tests for methods
// https://guide.meteor.com/testing.html

import { Meteor } from 'meteor/meteor';
import { assert } from 'meteor/practicalmeteor:chai';
import Counters from './counters.js';
import { countersInsert, countersIncrease } from './methods.js';

if (Meteor.isServer) {
  describe('counters method', function () {
    beforeEach(function () {
      Counters.remove({});
    });

    let _id = null;

    it('can add a counter', async function () {
      _id = await countersInsert.call();
      assert.equal(Counters.find().count(), 1);
    });

    it('can increase a counter', async function () {
      assert.equal(Counters.find().fetch().count, 0);
      await countersIncrease.call(_id);
      assert.equal(Counters.find().fetch().count, 1);
    });
  });
}
