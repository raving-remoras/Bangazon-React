/**
 * Purpose: Handles the view for all Employees from /api/v1/employees
 * Author: Sebastian Civarolo
 */

import React, { Component } from "react"
import { Container } from "reactstrap"
import APICalls from "../../../modules/APICalls"
import { ListGroup, ListGroupItem, Row, Col, Button } from "reactstrap"
import EmployeeListComponent from "./EmployeeListComponent"
import EmployeeForm from "./EmployeeForm"


class Employees extends Component {
  state = {
    employees: [],
    addNew: false
  }

  componentDidMount() {
    this.refresh()
  }

  formToggle= ()=>{
    this.setState({addNew: !this.state.addNew})
  }

  employeeFormHolder(){
    if(this.state.addNew === false){
      return <Button onClick={()=>this.formToggle()}>+</Button>
    }else if(this.state.addNew === true){
      return <EmployeeForm formToggle={this.formToggle} refresh={this.refresh}/>
    }
  }

  refresh = () => {
    APICalls.getAllFromCategory("employees")
      .then(employees => this.setState({
        employees: employees,
        addNew: false
      }))

  }

  render() {
    return (
      <Container>
        <h1>Employees</h1>
        {this.employeeFormHolder()}
        <ListGroup>
          <ListGroupItem color="info">
            <Row>
              <Col><h6>First Name</h6></Col>
              <Col><h6>Last Name</h6></Col>
            </Row>
          </ListGroupItem>
          {this.state.employees.map((employee, i) => {
            return <EmployeeListComponent key={i} employee={employee} />
          })}

        </ListGroup>
      </Container>
    )
  }
}

export default Employees