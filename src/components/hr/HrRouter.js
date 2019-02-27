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
<<<<<<< HEAD
import EmployeeDetailPage from "./employees/EmployeeDetailPage"
=======
import Computers from "./computers/computers"
import ComputerDetail from "./computers/computerDetail"
>>>>>>> master

class HrRouter extends Component {
  state = {}
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
          <Route exact path="/hr/employees" render={(props) => <Employees {...props} />} />
          <Route path="/hr/employees/:employeeId(\d+)" render={(props => {
            return <EmployeeDetailPage {...props}  />

          })} />
          <Route exact path="/hr/computers" render={(props) => <Computers {...props} />} />
          <Route path="/hr/computers/:compId(\d+)" render={(props) => <ComputerDetail {...props}/>}
          />
        </Switch>
      </>
    )
  }
}

export default HrRouter