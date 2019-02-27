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
import CustomerDetail from "./customers/customerDetail"

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
          <Route exact path="/ecommerce/customers" render={(props) => <Customers {...props} />} />
          <Route
            path="/ecommerce/customers/:customerId(\d+)"
            render={props => {
              return <CustomerDetail {...props} />
            }} />
        </Switch>
      </>
    )
  }
}

export default EcommerceRouter