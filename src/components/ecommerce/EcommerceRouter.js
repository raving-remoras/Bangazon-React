import React, { Component } from "react"
import {
  Switch,
  Route,
  NavLink as RouterNavLink
} from "react-router-dom"
import {
  Nav,
  Navbar,
  NavItem,
  NavLink
} from "reactstrap"

import Customers from "./customers/customers"

class EcommerceRouter extends Component {
  state = {  }
  render() {
    return (
      <>
        <Navbar color="light" className="mb-4" expand="xs">
          <Nav navbar>
            <NavItem>
              <NavLink tag={RouterNavLink} to="/ecommerce/customers">Customers</NavLink>
            </NavItem>
          </Nav>
        </Navbar>

        {/* Sub Router for all ecommerce paths */}
        <Switch>
          <Route path="/ecommerce/customers" render={(props) => <Customers {...props} />} />
        </Switch>
      </>
    )
  }
}

export default EcommerceRouter