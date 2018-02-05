// Tests for common methods
//
// https://guide.meteor.com/testing.html

import { Meteor } from 'meteor/meteor';
import { assert } from 'meteor/practicalmeteor:chai';
import { Counters } from './counters.js';
import './methods.common.js';

describe('counters method', function() {
  beforeEach(function() {
    Counters.remove({});
  });

  it('can add a new counter', function() {
    const addCounter = Meteor.server.method_handlers['counters.insert'];

    addCounter.apply({}, [this.userId]);

    assert.equal(Counters.find().count(), 1);
  });
});
