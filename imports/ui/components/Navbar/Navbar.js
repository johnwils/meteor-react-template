import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import './Navbar.scss';

const PublicNav = () => [
  <li key="login" className="nav-item">
    <span className="nav-link">
      <NavLink to="/login">Login</NavLink>
    </span>
  </li>,
  <li key="signup" className="nav-item">
    <span className="nav-link">
      <NavLink to="/signup">Signup</NavLink>
    </span>
  </li>,
];

const SearchBar = () => (
  <form className="form-inline">
    <input
      className="form-control mr-sm-2"
      type="search"
      placeholder="Search.."
      aria-label="Search"
    />
    <button className="btn btn-secondary my-2 my-sm-0" type="button">
      <i className="fa fa-search" />
    </button>
  </form>
);

const LoggedInNav = () => [
  <SearchBar key="searchbar" />,
  <li key="dropdown" className="nav-item dropdown ml-4">
    <span
      className="nav-link dropdown-toggle"
      id="navbarDropdownMenuLink"
      data-toggle="dropdown"
      aria-haspopup="true"
      aria-expanded="false"
    />
    <div
      className="dropdown-menu dropdown-menu-right"
      aria-labelledby="navbarDropdownMenuLink"
    >
      <NavLink to="/profile">
        <button className="dropdown-item">Profile</button>
      </NavLink>
      <div className="dropdown-divider" />
      <NavLink to="/login" onClick={() => Meteor.logout()}>
        <button className="dropdown-item">Logout</button>
      </NavLink>
    </div>
  </li>,
];

const Status = ({ loggedIn }) => (
  <div className="my-2 mr-3">
    {loggedIn ? (
      <span className="text-success">
        <i className="fa fa-circle" />
      </span>
    ) : (
      <span className="text-secondary">
        <i className="fa fa-circle" />
      </span>
    )}
  </div>
);

Status.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
};

const Navbar = ({ loggedIn }) => (
  <nav className="navbar navbar-expand-md justify-content-between py-0">
    <Status loggedIn={loggedIn} />
    <span className="navbar-brand my-2">
      <NavLink to="/">Brand</NavLink>
    </span>
    <button
      className="navbar-toggler my-2"
      type="button"
      data-toggle="collapse"
      data-target="#navbarContent"
      aria-controls="navbarContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarContent">
      <ul className="navbar-nav ml-auto">
        {loggedIn ? <LoggedInNav /> : <PublicNav />}
      </ul>
    </div>
  </nav>
);

Navbar.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
};

export default Navbar;
