// Collection definition

import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';

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
      return new Date();
    },
    denyUpdate: true,
  },
  assignedTo: {
    type: String,
    optional: false,
  },
});

// attach schema
Issues.attachSchema(schema);

export default Issues;
