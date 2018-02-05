import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import './Authenticated.scss';

const Authenticated = ({ loggingIn, authenticated, userId, component, ...rest }) => (
  <Route {...rest} render={props => {
      if (loggingIn) return <div className="login-spinner"><div><i className="fa fa-circle-o-notch fa-spin"/></div></div>;
      return authenticated ? (
        React.createElement(component, { ...props, loggingIn, authenticated, userId })
      ) : (
        <Redirect to="/login" />
      );
    }}
  />
);

Authenticated.propTypes = {
  loggingIn: PropTypes.bool,
  authenticated: PropTypes.bool,
  component: PropTypes.func,
};

export default Authenticated;
