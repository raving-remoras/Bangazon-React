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

import Employees from "./employees/employees"
import Computers from "./computers/computers"
import ComputerForm from "./computers/computerForm"

class HrRouter extends Component {
  state = {  }
  render() {
    return (
      <>
        <Navbar color="light" className="mb-4" expand="xs">
          <Nav navbar>
            <NavItem>
              <NavLink tag={RouterNavLink} to="/hr/employees">Employees</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RouterNavLink} to="/hr/computers">Computers</NavLink>
            </NavItem>
          </Nav>
        </Navbar>

        {/* Sub Router for all HR paths */}
        <Switch>
          <Route path="/hr/employees" render={(props) => <Employees {...props} />} />
          <Route exact path="/hr/computers" render={(props) => <Computers {...props} />} />
          <Route path="/computers/:compId(\d+)" render={(props) => <ComputerForm {...props}/>}
            />
        </Switch>
      </>
    )
  }
}

export default HrRouter