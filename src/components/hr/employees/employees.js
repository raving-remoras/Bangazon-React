/**
 * Purpose: Handles the view for all Employees from /api/v1/employees
 * Author: Sebastian Civarolo
 */

import React, { Component } from "react"
import {
  Button,
  Container,
  Col,
  Row,
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText
} from "reactstrap"

import APICalls from "../../../modules/APICalls"
import EmployeeListItem from "./employeeListItem"

class Employees extends Component {

  state = {
    employees: []
  }

  componentDidMount() {
    APICalls.getAllFromCategory("employees")
      .then(employees => this.setState({employees}))
  }

  EmployeesList = employees => {
    return (
      <ListGroup>
        <ListGroupItem color="info">
          <Row>
            <Col><h6>Full Name</h6></Col>
            <Col><h6>Start Date</h6></Col>
            <Col><h6>End Date</h6></Col>
            <Col><h6>Department</h6></Col>
            <Col className="d-none d-lg-block"><h6>Current Computer</h6></Col>
          </Row>
        </ListGroupItem>
        {
          employees
            ? employees.map((employee, i) => {
              return (<EmployeeListItem key={i} employee={employee} />)
            })
            : null
        }
      </ListGroup>
    )
  }

  render() {
    return (
      <Container>
        <Row>
          <Col className="mb-5">
            <h1>Employees</h1>
          </Col>
          <Col md="6" className="text-right">
            <Button className="ml-auto">Search</Button>
            <Button className="ml-2">Filter</Button>
            <Button className="ml-2">Create</Button>
          </Col>
        </Row>
        <Row>
          <Col>
            {this.EmployeesList(this.state.employees)}
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Employees