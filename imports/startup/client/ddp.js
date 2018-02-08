/**
 * Client DDP Connection
 * Connect to existing meteor server using ddp
 */

import { Meteor } from 'meteor/meteor';
import { DDP } from 'meteor/ddp-client';
import { Accounts } from 'meteor/accounts-base';

// 1. establish ddp connection
const remoteUrl = '';
const ddp = DDP.connect(remoteUrl);

// 2. Replace base connections
Meteor.connection = ddp;
Accounts.connection = ddp;

// 3. Patch methods to make them accessible in client code
const methods = ["subscribe", "call", "apply", "methods", "status", "reconnect", "disconnect", "onReconnect"];
methods.forEach((method) => Meteor[method] = (...args) => ddp[method].apply(ddp, args));

// 4. now calls anywhere on the client execute over ddp
/**
Meteor.call('someMethod', (err) => {
  // 'someMethod' is run on the remote meteor server
  if (err) {
    return console.log('error calling method over ddp');
  }
  console.log('successfully called method over ddp!');
});
 */

// log connection status
ddp.onReconnect = function () {
  console.log('ddp.onReconnect', arguments);
}

// example: a collection from the remote server
const remoteCollection = new Meteor.Collection('collection-name', { connection: ddp });

// example: users from the remote server
const remoteUsers = new Meteor.Collection('users',{connection: ddp});

// example: subscribe to a publication from the remote server
Meteor.subscribe('some-publication');
