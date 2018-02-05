import { Meteor } from 'meteor/meteor';
import React from 'react';
import { NavLink } from 'react-router-dom';

// example importing components
import Text from '../../components/Text';
import Button from '../../components/Button';

// import locally scoped styles
import './Login.scss';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      err: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { email, password } = this.state;
    Meteor.loginWithPassword(email, password, err => {
      if (err) {
        this.setState({ err: err.reason });
        return console.log(err);
      }
    });
  }
  render() {
    return (
      <section className="login-page">
        <div className="card mx-auto" style={{ maxWidth: '28rem' }}>
          <div className="card-header">
            <div className="brand">
              <div className="text-center">
                <img
                  className="rounded-circle"
                  src="https://via.placeholder.com/150x150"
                  alt="logo"
                />
              </div>
            </div>
            <div className="card-body">
              <h4 className="card-title">Login</h4>
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <label htmlFor="email">E-Mail Address</label>

                  <input
                    id="email"
                    type="email"
                    className="form-control"
                    name="email"
                    value={this.state.email}
                    onChange={e => this.setState({ email: e.target.value })}
                    required
                    autoFocus
                  />
                </div>

                <div className="form-group">
                  <div className="spread-container">
                    <label htmlFor="password">Password</label>
                  </div>
                  <input
                    id="password"
                    type="password"
                    className="form-control"
                    name="password"
                    value={this.state.password}
                    onChange={e => this.setState({ password: e.target.value })}
                    required
                  />
                  <NavLink to="/recover-password">Forgot Password?</NavLink>
                </div>
                <div className="form-group no-margin">
                  <button type="submit" className="btn btn-primary btn-block">
                    Login
                  </button>
                </div>
                <div className="margin-top20">
                  Don't have an account?{' '}
                  <NavLink to="/signup">Create one</NavLink>
                </div>
              </form>
            </div>
          </div>
          <div className="footer text-center">&copy; 2018</div>
        </div>
      </section>
    );
  }
}

export default Login;
