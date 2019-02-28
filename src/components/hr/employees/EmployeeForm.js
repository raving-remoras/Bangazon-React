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
    this.getDepartments()

  }

  getComputers() {
    APICalls.getAllFromCategory("computers")
      .then(computers => this.setState({ computers }))
  }

  getDepartments() {
    APICalls.getAllFromCategory("departments")
      .then(departments => this.setState({ departments }))
  }

  // TODO:Form validation
  post() {
    let employeeObj = {
      first_name: this.state.employeeFirstName,
      last_name: this.state.employeeLastName,
      start_date: this.state.employeeStartDate,
      end_date: this.state.employeeEndtDate,
      is_supervisor: this.state.employeeSupervisor,
      department: this.state.employeeDepartment
    }
    console.log(employeeObj)

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
            console.log("employee", employee)
            compEmployeeJoin.employee = employee.id
            console.log("join", compEmployeeJoin)
            // if a new computer is assinged, this will add the new relationship and remove the old relationship
            if (this.state.employeeComputer === "remove") {
              console.log("REMVOE")
              console.log("why", this.props.employee.current_computer)
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
              console.log("computer", computerUnAssign)
              APICalls.update("employeecomputers", computerUnAssign, this.props.employee.current_computer.employeecomputer_id)
                .then((data ) => {
                  console.log("did it work", data)
                  this.props.refresh()
                })
            } else {
              if (this.props.employee.current_computer === null) {
                if (this.state.employeeComputer !== null) {
                  compEmployeeJoin.employee = this.props.employee.id
                  APICalls.post("employeecomputers", compEmployeeJoin)
                    .then(() => this.props.refresh())
                }
                this.props.refresh()
              }
              else {
                (this.props.employee.current_computer.computer.id === this.state.employeeComputer)
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
                      console.log("computer", computerUnAssign)
                      APICalls.update("employeecomputers", computerUnAssign, this.props.employee.current_computer.employeecomputer_id)
                        .then(() => this.props.refresh())
                    })
              }
            }
          })

        // if new
        : APICalls.post("employees", employeeObj)
          .then((employee) => {
            compEmployeeJoin.employee = employee.id
            console.log("join", compEmployeeJoin)
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
            <option value={false}>No</option>
            <option value={true}>Yes</option>
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
        <Button onClick={() => this.props.formToggle()}>Back</Button>
        <Button type="submit">Save</Button>

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