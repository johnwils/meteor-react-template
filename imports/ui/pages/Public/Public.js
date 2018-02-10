import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import './Public.scss';

const Public = ({ authenticated, component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      (!authenticated ? (
        React.createElement(component, { ...props })
      ) : (
        <Redirect to="/profile" />
      ))
    }
  />
);

Public.defaultProps = {
  userId: null,
};

Public.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
  userId: Meteor.user() ? PropTypes.string.isRequired : () => null,
};

export default Public;
