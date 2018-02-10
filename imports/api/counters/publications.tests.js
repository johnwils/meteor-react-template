/* eslint-disable no-undef */
// Tests for publications
//
// https://guide.meteor.com/testing.html

import { assert } from 'meteor/practicalmeteor:chai';
import { PublicationCollector } from 'meteor/johanbrook:publication-collector';

import Counters from './counters.js';
import './publications.js';

describe('counters publications', function () {
  beforeEach(function () {
    Counters.remove({});
    Counters.insert({
      _id: this.userId,
      count: 0,
    });
  });

  describe('counters.all', function () {
    it('sends all counters', function (done) {
      const collector = new PublicationCollector();
      collector.collect('counters.all', (collections) => {
        assert.equal(collections.counters.length, 1);
        done();
      });
    });
  });
});
