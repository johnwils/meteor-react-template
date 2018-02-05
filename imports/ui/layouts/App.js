import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import React from 'react';
import PropTypes from 'prop-types';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

// import navbar
import Navbar from '../../ui/components/Navbar';

// import routes
import Public from '../pages/Public';
import Authenticated from '../pages/Authenticated';
import Landing from '../../ui/pages/Landing';
import Login from '../../ui/pages/Login';
import Signup from '../../ui/pages/Signup';
import Profile from '../../ui/pages/Profile';
import RecoverPassword from '../../ui/pages/RecoverPassword';
import NotFound from '../../ui/pages/Not-Found';

const App = appProps => (
  <Router>
    <div>
      <Navbar {...appProps} />
      <div className="container-fluid">
        <Switch>
          <Public path="/login" component={Login} {...appProps} />
          <Route exact name="landing" path="/" component={Landing} />
          <Public path="/signup" component={Signup} {...appProps} />
          <Authenticated exact path="/profile" component={Profile} {...appProps} />
          <Route name="recover-password" path="/recover-password" component={RecoverPassword} />
          {/*
          TODO: add remaining routes
          <Authenticated exact path="/profile/:_id" component={Profile} {...appProps} />
          <Route name="reset-password" path="/reset-password/:token" component={ResetPassword} />
          */}
          <Route component={NotFound} />
        </Switch>
      </div>
    </div>
  </Router>
);

App.propTypes = {
  loggingIn: PropTypes.bool,
  authenticated: PropTypes.bool,
  userId: PropTypes.string,
};

export default withTracker(() => {
  const loggingIn = Meteor.loggingIn();
  return {
    loggingIn,
    authenticated: !loggingIn && !!Meteor.userId(),
    userId: Meteor.userId(),
    user: Meteor.user(),
  };
})(App);
