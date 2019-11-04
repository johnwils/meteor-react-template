// Collection definition

import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import Users from '../users/users';

// define collection
const Issues = new Meteor.Collection('issues');

// define schema
const schema = new SimpleSchema({
  _id: {
    type: String,
  },
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
    min: 1,
    max: 10,
    // decimal: true,
  },
  // zip code
  location: {
    type: String,
    optional: false,
  },
  // owner user id
  owner: {
    type: String,
    optional: false,
    autoValue() {
      if (this.isInsert && (!this.isFromTrustedCode || !this.isSet)) {
        return this.userId;
      }
      return undefined;
    },
    denyUpdate: true,
  },

  createdOn: {
    type: Date,
    optional: false,
    autoValue() {
      if (this.isInsert && !this.isSet) {
        return new Date();
      }
    },
    denyUpdate: true,
  },
  assignedTo: {
    type: String,
    optional: false,
  },
  state: {
    type: String,
    optional: false,
    allowedValues: ['backlog', 'todo', 'in-progress', 'done'],
    autoValue() {
      if (this.isInsert && !this.isSet) return 'backlog';
    },
  },
  ownerName: {
    type: String,
    optional: false,
  },
});

// attach schema
Issues.attachSchema(schema);

export default Issues;
