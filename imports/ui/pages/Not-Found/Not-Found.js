import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Link } from 'react-router-dom';

import './Not-Found.scss';

const NotFound = () => (
  <div className="not-found-page">
    <div className="alert alert-secondary" role="alert">
      Page Not Found
    </div>
  </div>
);

export default NotFound;
