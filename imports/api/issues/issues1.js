import { Mongo } from 'meteor/mongo';

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

const Issues = new Mongo.Collection('issues');

if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish tasks that are public or belong to the current user
  Meteor.publish('assignedIssues', function issuePublications() {
    return Issues.find({
      owner: this.userId,
    });
  });
}

if (Meteor.isServer) {
  Meteor.methods({
    'issues.insert'(text) {
      check(text, String);

      // Make sure the user is logged in before inserting a task
      if (!this.userId) {
        throw new Meteor.Error('not-authorized');
      }

      Issues.insert({
        text,
        createdAt: new Date(),
        owner: this.userId,
        username: Meteor.users.findOne(this.userId).username,
      });
    },
    'issues.remove'(issueId) {
      check(issueId, String);

      const issue = Issues.findOne(issueId);
      if (issue.owner !== this.userId) {
        // If the task is private, make sure only the owner can delete it
        throw new Meteor.Error('not-authorized');
      }

      Issues.remove(issueId);
    },
  });
}

// export const issueInsert = new ValidatedMethod({
//   name: 'issue.insert',
//   //   mixin: [CallPromiseMixin],
//   validate: null,
//   run(text) {
//     // const _id = Random.id();
//     // console.log('counters.insert', _id);
//     if (!this.userId) {
//       throw new Meteor.Error('not-authorized');
//     }
//     Issues.insert({
//       text,
//       createdAt: new Date(),
//       owner: Meteor.userId(),
//       username: Meteor.users.findOne(this.userId).username,
//     });
//   },
// });

export default Issues;
