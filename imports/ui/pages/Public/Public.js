import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import './Public.scss';

const Public = ({ loggingIn, authenticated, component, ...rest }) => (
  <Route {...rest} render={props => {
    if (loggingIn) return <div className="login-spinner"><div><i className="fa fa-circle-o-notch fa-spin"/></div></div>;
      return !authenticated ? (
        React.createElement(component, { ...props, loggingIn, authenticated })
      ) : (
        <Redirect to="/profile" />
      );
    }}
  />
);

Public.propTypes = {
  loggingIn: PropTypes.bool,
  authenticated: PropTypes.bool,
  component: PropTypes.func,
};

export default Public;
