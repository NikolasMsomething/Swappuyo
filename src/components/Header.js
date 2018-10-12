import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => (
  <header>
    <NavLink to="/" activeClassName="is-active" exact={true}>
      Home
    </NavLink>
    <NavLink to="/about" activeClassName="is-active">
      About
    </NavLink>
    <NavLink to="/work" activeClassName="is-active">
      Work
    </NavLink>
    <NavLink to="/contact" activeClassName="is-active">
      Contact
    </NavLink>
  </header>
);

export default Header;
