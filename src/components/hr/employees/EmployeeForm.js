import React, { Component } from "react"
import PropTypes from "prop-types"
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap"
import APICalls from "../../../modules/APICalls"



class EmployeeForm extends Component {
  state = {
    employeeFirstName: "",
    employeeLastName: "",
    employeeStartDate: null,
    employeeEndtDate: null,
    employeeSuperisor: false
  }

  componentDidMount() {
    if (this.props.employee) {
      this.setState({
        employeeFirstName: this.props.employee.first_name,
        employeeLastName: this.props.employee.last_name,
        employeeStartDate: this.props.employee.startDate,
        employeeEndtDate: this.props.employee.endDate,
        employeeSuperisor: this.props.employee.is_supervisor
      })
    }
  }


  // TODO:Form validation
  post() {
    let employeeObj = {
      first_name: this.state.employeeFirstName,
      last_name: this.state.employeeLastName,
      start_date: this.state.employeeStartDate,
      end_date: this.state.employeeEndtDate,
      is_supervisor: this.state.employeeSuperisor
    }
    console.log(employeeObj)

    {
      (this.props.employee)
        ? APICalls.update("employees", employeeObj, this.props.employee.id)
          .then(() => this.props.refresh())
        : APICalls.post("employees", employeeObj)
          .then(() => this.props.refresh())

    }

  }

  handleFieldChange = (evt) => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }

  render() {
    return (
      <Form>
        <FormGroup>
          <Label>First Name</Label>
          <Input type="text" onChange={(e) => this.handleFieldChange(e)} defaultValue={this.state.employeeFirstName} id="employeeFirstName" />
        </FormGroup>
        <FormGroup>
          <Label>Last Name</Label>
          <Input type="text" onChange={(e) => this.handleFieldChange(e)} defaultValue={this.state.employeeLastName} id="employeeLastName" />
        </FormGroup>
        <FormGroup>
          <Label>Start Date</Label>
          <Input type="datetime-local" onChange={(e) => this.handleFieldChange(e)} defaultValue={this.state.employeeStartDate} id="employeeStartDate"></Input>
        </FormGroup>
        <FormGroup>
          <Label>End Date</Label>
          <Input type="datetime-local" onChange={(e) => this.handleFieldChange(e)} defaultValue={this.state.employeeEndtDate} id="employeeEndtDate"></Input>
        </FormGroup>
        <Button onClick={() => this.props.formToggle()}>Back</Button>
        <Button onClick={() => {
          this.post()
          this.props.refresh()
        }}>Save</Button>

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