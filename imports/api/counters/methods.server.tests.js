/* eslint-disable no-undef */
// Tests for private server methods
//
// https://guide.meteor.com/testing.html

import { Meteor } from 'meteor/meteor';
import { assert } from 'meteor/practicalmeteor:chai';
import Counters from './counters.js';
import { countersInsert } from './methods.server.js';

if (Meteor.isServer) {
  describe('counters method', function () {
    beforeEach(function () {
      Counters.remove({});
    });

    it('can add a new counter', async function () {
      await countersInsert.call();
      assert.equal(Counters.find().count(), 1);
    });
  });
}
