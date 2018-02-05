/**
 * Connect to existing meteor server using ddp
 */

import { Meteor } from 'meteor/meteor';
import { DDP } from 'meteor/ddp-client';
import { Accounts } from 'meteor/accounts-base';

// establish ddp connection
const remoteUrl = '';
const ddp = DDP.connect(remoteUrl);

// example: ddp method call (ddp.call is used in place of Meteor.call)
ddp.call('someMethod', (err) => {
  // 'someMethod' is run on the remote meteor server
  if (err) {
    return console.log('error calling method over ddp');
  }
  console.log('successfully called method over ddp!');
});

// log connection status
ddp.onReconnect = function () {
  console.log('ddp.onReconnect', arguments);
}

// example: export a collection from the remote server
export const remoteCollection = new Meteor.Collection('collection-name', { connection: ddp });

// example: populate users from the remote server
export const remoteUsers = new Meteor.Collection('users',{connection: ddp});

// example: subscribe to a publication from the remote server
ddp.subscribe('some-publication');
