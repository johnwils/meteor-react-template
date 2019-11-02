/**
 * Meteor methods
 */

import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { LoggedInMixin } from 'meteor/tunifight:loggedin-mixin';
import { MethodHooks } from 'meteor/lacosta:method-hooks';
import { CallPromiseMixin } from 'meteor/didericis:callpromise-mixin';
import SimpleSchema from 'simpl-schema';
import Issues from './issues';

/** **************** Helpers **************** */

const mixins = [LoggedInMixin, MethodHooks, CallPromiseMixin];

// not logged in error message
const checkLoggedInError = {
  error: 'notLogged',
  message: 'You need to be logged in to call this method',
  reason: 'You need to login',
};

/** **************** Methods **************** */

/**
 * countersIncrease
 */

// eslint-disable-next-line no-unused-vars, arrow-body-style
const beforeHookExample = (methodArgs, methodOptions) => {
  // console.log('countersIncrease before hook');
  // perform tasks
  return methodArgs;
};
// eslint-disable-next-line no-unused-vars, arrow-body-style
const afterHookExample = (methodArgs, returnValue, methodOptions) => {
  // console.log('countersIncrease: after hook:');
  // perform tasks
  return returnValue;
};

export const issueCreate = new ValidatedMethod({
  name: 'issues.insert',
  mixins,
  beforeHooks: [beforeHookExample],
  afterHooks: [afterHookExample],
  checkLoggedInError,
  checkRoles: {
    roles: ['admin', 'user'],
    rolesError: {
      error: 'not-allowed',
      message: 'You are not allowed to call this method',
    },
  },
  validate: new SimpleSchema({
    category: {
      type: String,
      allowedValues: [
        'roads',
        'water',
        'electricity',
        'traffic',
        'school',
        'university',
      ],
      optional: false,
    },
    title: {
      type: String,
      optional: false,
    },
    description: {
      type: String,
      optional: false,
    },
    severity: {
      type: Number,
      optional: false,
      // decimal: true,
    },
    // zip code
    location: {
      type: String,
      optional: false,
    },
    assignedTo: {
      type: String,
      optional: false,
    },
  }).validator(),
  run({ category, title, description, severity, location, assignedTo }) {
    if (Meteor.isServer) {
      // secure code - not available on the client
      if (!this.userId) {
        throw new Meteor.Error('not-authorized');
      }
      console.log('running insert method');
      return Issues.insert({
        category,
        title,
        description,
        severity,
        location,
        assignedTo,
      });
    }

    // call code on client and server (optimistic UI)
  },
});

export const issueUpdate = new ValidatedMethod({
  name: 'issues.update',
  mixins,
  beforeHooks: [beforeHookExample],
  afterHooks: [afterHookExample],
  checkLoggedInError,
  checkRoles: {
    roles: ['admin', 'user'],
    rolesError: {
      error: 'not-allowed',
      message: 'You are not allowed to call this method',
    },
  },
  validate: new SimpleSchema({
    title: { type: String },
  }).validator(),
  run(issueInstance) {
    if (Meteor.isServer) {
      // secure code - not available on the client
      if (!this.userId) {
        throw new Meteor.Error('not-authorized');
      }
      return Issues.update(issueInstance);
    }
    // call code on client and server (optimistic UI)
  },
});

export const issueDelete = new ValidatedMethod({
  name: 'issues.delete',
  mixins,
  beforeHooks: [beforeHookExample],
  afterHooks: [afterHookExample],
  checkLoggedInError,
  checkRoles: {
    roles: ['admin', 'user'],
    rolesError: {
      error: 'not-allowed',
      message: 'You are not allowed to call this method',
    },
  },
  validate: new SimpleSchema({
    _id: { type: String },
  }).validator(),

  run(issueId) {
    if (Meteor.isServer) {
      // secure code - not available on the client
    }
    if (!this.userId || Issues.findOne(issueId).owner !== this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    console.log('issue id owner ', Issues.findOne(issueId));
    console.log(issueId);
    const removeStatus = Issues.remove(issueId);
    console.log(removeStatus);
    return removeStatus;
    // call code on client and server (optimistic UI)
  },
});
// /**
//  * used for example test in methods.tests.js
//  */
// export const countersInsert = new ValidatedMethod({
//   name: 'counters.insert',
//   mixin: [CallPromiseMixin],
//   validate: null,
//   run() {
//     const _id = Random.id();
//     // console.log('counters.insert', _id);
//     const counterId = Counters.insert({
//       _id,
//       count: Number(0),
//     });
//     return counterId;
//   },
// });
