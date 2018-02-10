import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import './Authenticated.scss';

const Authenticated = ({
  authenticated, userId, component, ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      (authenticated ? (
        React.createElement(component, {
          ...props,
          userId,
        })
      ) : (
        <Redirect to="/login" />
      ))
    }
  />
);

Authenticated.defaultProps = {
  userId: null,
};

Authenticated.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
  userId: Meteor.user() ? PropTypes.string.isRequired : () => null,
};

export default Authenticated;
