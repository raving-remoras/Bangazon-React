import React, { Component } from "react"
import { NavLink as RouterNavLink } from "react-router-dom"
import {
  Nav,
  Navbar,
  NavbarBrand,
  NavItem,
  NavLink
} from "reactstrap"
class App extends Component {
  render() {
    return (
      <Navbar color="primary" expand="xs">
        <NavbarBrand className="text-white" href="/">Bangazon API</NavbarBrand>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink className="text-white" tag={RouterNavLink} to="/hr">HR</NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="text-white" tag={RouterNavLink} to="/ecommerce">E-Commerce</NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    )
  }
}

export default App
