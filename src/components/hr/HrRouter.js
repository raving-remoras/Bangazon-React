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
import ComputerDetail from "./computers/computerDetail"
import Trainings from "./trainings/trainings"
import TrainingDetail from "./trainings/trainingDetail"
import Departments from "./departments/departments"
import DepartmentDetail from "./departments/departmentDetail"

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
            <NavItem>
              <NavLink tag={RouterNavLink} to="/hr/trainings">Trainings</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RouterNavLink} to="/hr/departments">Departments</NavLink>
            </NavItem>
          </Nav>
        </Navbar>

        {/* Sub Router for all HR paths */}
        <Switch>
          <Route path="/hr/employees" render={(props) => <Employees {...props} />} />
          <Route exact path="/hr/computers" render={(props) => <Computers {...props} />} />
          <Route path="/hr/computers/:compId(\d+)" render={(props) => <ComputerDetail {...props}/>}
          />
          <Route exact path="/hr/trainings" render={(props) => <Trainings {...props} />} />
          <Route path="/hr/trainings/:trainingId(\d+)" render={(props) => <TrainingDetail {...props}/>} />
          <Route exact path="/hr/departments" render={(props) => <Departments {...props} />} />
          <Route path="/hr/departments/:deptId(\d+)" render={(props) => <DepartmentDetail {...props}/>}
          />
        </Switch>
      </>
    )
  }
}

export default HrRouter