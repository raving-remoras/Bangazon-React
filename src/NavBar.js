import React, { Component } from "react"
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
      <Navbar>
        <NavbarBrand href="/">Bangazon API</NavbarBrand>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink href="/components/">Components</NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    )
  }
}

export default App
