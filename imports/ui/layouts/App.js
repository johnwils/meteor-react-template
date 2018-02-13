import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// import navbar
import Navbar from '../../ui/components/Navbar';

// import routes
import PropsRoute from '../../ui/pages/PropsRoute';
import Landing from '../../ui/pages/Landing';
import Login from '../../ui/pages/Login';
import Signup from '../../ui/pages/Signup';
import Profile from '../../ui/pages/Profile';
import RecoverPassword from '../../ui/pages/RecoverPassword';
import NotFound from '../../ui/pages/Not-Found';

// import Spinner
import Spinner from '../components/Spinner';

const App = props => (
  <Router>
    <div>
      <Navbar authenticated={props.authenticated} user={props.user} />
      {props.loggingIn && <Spinner />}
      <div className="container-fluid">
        <Switch>
          <PropsRoute exact name="landing" path="/" component={Landing} {...props} />
          <PropsRoute exact path="/login" component={Login} {...props} />
          <PropsRoute exact path="/signup" component={Signup} {...props} />
          <PropsRoute exact path="/profile" component={Profile} {...props} />
          <PropsRoute exact path="/recover-password" component={RecoverPassword} {...props} />
          {/*
          TODO: add remaining routes
          <Authenticated exact path="/profile/:_id" component={Profile} {...props} />
          <Route name="reset-password" path="/reset-password/:token" component={ResetPassword} />
          */}
          <Route component={NotFound} />
        </Switch>
      </div>
    </div>
  </Router>
);

App.defaultProps = {
  userId: null,
  user: null,
};

App.propTypes = {
  loggingIn: PropTypes.bool.isRequired,
  authenticated: PropTypes.bool.isRequired,
  userId: Meteor.user() ? PropTypes.string.isRequired : () => null,
  user: Meteor.user() ? PropTypes.object.isRequired : () => null,
};

export default withTracker(() => ({
  loggingIn: Meteor.loggingIn(),
  authenticated: Boolean(!Meteor.loggingIn() && !!Meteor.userId()),
  userId: Meteor.userId(),
  user: Meteor.user(),
}))(App);
