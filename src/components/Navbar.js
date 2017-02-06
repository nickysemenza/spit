import React, { Component, PropTypes } from 'react';
import { Navbar, NavItem, NavDropdown, Nav, MenuItem } from 'react-bootstrap';
import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap';
import { Router, Route, Link, browserHistory } from 'react-router';
// import './navbar.scss';
export default class Header extends Component {
  render () {
    return (
      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#" />
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <IndexLinkContainer to="/"><NavItem eventKey={3.1}>Landing Page</NavItem></IndexLinkContainer>
            <LinkContainer to="/game/123"><NavItem eventKey={3.2}>Example game page</NavItem></LinkContainer>
          </Nav>
          <Nav pullRight>
            <NavItem eventKey={1} href="#">Link Right</NavItem>
            <NavItem eventKey={2} href="#">Link Right</NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
