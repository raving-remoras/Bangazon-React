/**
 * Purpose: Handles the form for creating and editing an employee
 * Author: Jase Hackman
 */

import React, { Component } from "react"
import PropTypes from "prop-types"
import { Button, Form, FormGroup, Label, Input } from "reactstrap"
import APICalls from "../../../modules/APICalls"


class EmployeeForm extends Component {
  state = {
    employeeFirstName: "",
    employeeLastName: "",
    employeeStartDate: null,
    employeeEndtDate: null,
    employeeSupervisor: false,
    employeeComputer: null,
    employeeDepartment: null,
    computers: [],
    departments: [],
    departmentOption: "",
    option: "",
    superOption: "",
    loaded: false
  }

  componentDidMount() {

    if (this.props.employee) {
      let stateObj = {
        employeeFirstName: this.props.employee.first_name,
        employeeLastName: this.props.employee.last_name,
        employeeStartDate: this.props.employee.start_date,
        employeeEndtDate: this.props.employee.end_date,
        employeeSupervisor: this.props.employee.is_supervisor,
        employeeDepartment: this.props.employee.department.id,
        loaded: true
      }
      if (this.props.employee.current_computer) {
        stateObj.employeeComputer = this.props.employee.current_computer.computer.id

      }
      this.setState(stateObj)
    }

    this.getComputers()
    this.defaultComputer()
    this.defaultDepartment()
    this.defaultSuper()
    this.getDepartments()

  }

  getComputers() {
    APICalls.getAllFromCategoryWithQuery("computers", "_filter", "available")
      .then(computers => this.setState({ computers }))
  }

  getDepartments() {
    APICalls.getAllFromCategory("departments")
      .then(departments => this.setState({ departments }))
  }

  post() {
    let employeeObj = {
      first_name: this.state.employeeFirstName,
      last_name: this.state.employeeLastName,
      start_date: this.state.employeeStartDate,
      end_date: this.state.employeeEndtDate,
      is_supervisor: this.state.employeeSupervisor,
      department: this.state.employeeDepartment
    }

    let compEmployeeJoin = {
      computer: this.state.employeeComputer,
      date_assigned: new Date().toISOString(),
      date_revoked: null
    }

    {
      (this.props.employee)
        // if edit
        ? APICalls.update("employees", employeeObj, this.props.employee.id)
          .then((employee) => {
            compEmployeeJoin.employee = employee.id

            if (this.state.employeeComputer === "remove") {
              // If remove a computer was selected this will updated their current computer with a revoke date
              let computerUnAssign = {
                computer: this.props.employee.current_computer.computer.id,
                make: this.props.employee.current_computer.computer.make,
                model: this.props.employee.current_computer.computer.model,
                serial_no: this.props.employee.current_computer.computer.serial_no,
                purchase_date: this.props.employee.current_computer.computer.purchase_date,
                employee: employee.id,
                date_assigned: this.props.employee.current_computer.date_assigned,
                date_revoked: new Date().toISOString()
              }
              APICalls.update("employeecomputers", computerUnAssign, this.props.employee.current_computer.employeecomputer_id)
                .then(() => {
                  this.props.refresh()
                })
            } else {
              if (this.props.employee.current_computer === null) {
                if (this.state.employeeComputer !== null) {
                  // If they didn't have a computer and now have been assigned one.
                  compEmployeeJoin.employee = this.props.employee.id
                  APICalls.post("employeecomputers", compEmployeeJoin)
                    .then(() => this.props.refresh())
                }
                this.props.refresh()
              }
              else {
                (this.props.employee.current_computer.computer.id === this.state.employeeComputer)
                  // if their computer assignment changed, their old computer will be removed and revoked and the new computer assigned
                  ? this.props.refresh()
                  : APICalls.post("employeecomputers", compEmployeeJoin)
                    .then(() => {
                      let computerUnAssign = {
                        computer: this.props.employee.current_computer.computer.id,
                        make: this.props.employee.current_computer.computer.make,
                        model: this.props.employee.current_computer.computer.model,
                        serial_no: this.props.employee.current_computer.computer.serial_no,
                        purchase_date: this.props.employee.current_computer.computer.purchase_date,
                        employee: employee.id,
                        date_assigned: this.props.employee.current_computer.date_assigned,
                        date_revoked: new Date().toISOString()
                      }
                      APICalls.update("employeecomputers", computerUnAssign, this.props.employee.current_computer.employeecomputer_id)
                        .then(() => this.props.refresh())
                    })
              }
            }
          })

        // if new employee and computer
        : APICalls.post("employees", employeeObj)
          .then((employee) => {
            compEmployeeJoin.employee = employee.id
            APICalls.post("employeecomputers", compEmployeeJoin)
            this.props.refresh()
          })
    }
  }

  handleFieldChange = (evt) => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }

  defaultComputer() {
    // sets the select dropdown with their current computer or a default option
    let option
    if (!this.props.employee) {
      {
        option = <option value={null}>Assign a Computer</option>
      }
    }
    else if (this.props.employee.current_computer === null) {
      option = <option value={null}>Assign a Computer</option>
    }
    else if (this.props.employee.current_computer) {
      option = <>
        <option value={this.props.employee.current_computer.computer.id}>{this.props.employee.current_computer.computer.model}, {this.props.employee.current_computer.computer.serial_no}</option>
        <option value="remove">Remove Computer</option>

      </>
    }
    this.setState({ option })
  }

  defaultDepartment() {
    // sets the select dropdown with their current department or a default option

    let departmentOption
    if (!this.props.employee) {
      departmentOption = <option value={null}>Assign a Department</option>

    }
    else if (this.props.employee.department === null) {
      departmentOption = <option value={null}>Assign a Department</option>
    }
    else {
      departmentOption = <option value={this.props.employee.department.id}>{this.props.employee.department.name}</option>

    }
    this.setState({ departmentOption })
  }

  defaultSuper() {
    let superOption
    if (!this.props.employee) {
      superOption = <>
        <option value={false}>No</option>
        <option value={true}>Yes</option>
      </>
    } else if (this.props.employee.is_supervisor){
      superOption = <>
        <option value={true}>Yes</option>
        <option value={false}>No</option>
      </>
    } else {
      superOption = <>
        <option value={false}>No</option>
        <option value={true}>Yes</option>
      </>
    }
    this.setState({superOption})
  }

  render() {

    return (
      <Form onSubmit={(e) => {
        e.preventDefault()
        this.post()
        this.props.refresh()
      }}>
        <FormGroup>
          <Label>First Name</Label>
          <Input required type="text" onChange={(e) => this.handleFieldChange(e)} defaultValue={this.state.employeeFirstName} id="employeeFirstName" />
        </FormGroup>
        <FormGroup>
          <Label>Last Name</Label>
          <Input required type="text" onChange={(e) => this.handleFieldChange(e)} defaultValue={this.state.employeeLastName} id="employeeLastName" />
        </FormGroup>
        <FormGroup>
          <Label>Start Date</Label>
          <Input required type="datetime-local" onChange={(e) => this.handleFieldChange(e)} defaultValue={this.state.employeeStartDate} id="employeeStartDate"></Input>
        </FormGroup>
        <FormGroup>
          <Label>End Date</Label>
          <Input type="datetime-local" onChange={(e) => this.handleFieldChange(e)} defaultValue={this.state.employeeEndtDate} id="employeeEndtDate"></Input>
        </FormGroup>
        <FormGroup>
          <Label>Department</Label>
          <Input required type="select" id="employeeDepartment" onChange={(e) => this.handleFieldChange(e)}>
            {this.state.departmentOption}
            {this.state.departments.map(department => {
              return <option key={department.id} value={department.id}>{department.name}</option>
            })}
          </Input>
        </FormGroup>
        <FormGroup>
          <Label>Supervisor</Label>
          <Input type="select" id="employeeSupervisor" onChange={e => this.handleFieldChange(e)}>
            {this.state.superOption}
          </Input>
        </FormGroup>
        <FormGroup>
          <Label>Assign a Computer</Label>
          <Input type="select" id="employeeComputer" onChange={(e) => this.handleFieldChange(e)}>
            {this.state.option}
            {this.state.computers.map(computer => {
              return <option key={computer.id} value={computer.id}>{computer.make}, {computer.model}, {computer.serial_no}</option>
            })}
          </Input>
        </FormGroup>
        <Button className="m-1" onClick={() => this.props.formToggle()}>Back</Button>
        <Button className="m-1" color="primary" type="submit">Save</Button>

      </Form>
    )
  }


}

EmployeeForm.propTypes = {
  employee: PropTypes.object,
  formToggle: PropTypes.func,
  refresh: PropTypes.func,
}

export default EmployeeForm