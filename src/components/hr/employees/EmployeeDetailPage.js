import React, { Component } from "react"
import { Container } from "reactstrap"
import APICalls from "../../../modules/APICalls"
import {Button } from "reactstrap"
import EmployeeForm from "./EmployeeForm"
import PropTypes from "prop-types"



class EmployeeDetailPage extends Component {
  state = {
    employee: {},
    edit: false
  }

  componentDidMount() {
    this.refresh()
  }

  formToggle = () => {
    this.setState({ edit: !this.state.edit })
  }

  employeeFormHolder() {
    if (this.state.edit === false) {
      return <Container className=" addButton"><Button color="primary" onClick={() => this.formToggle()}>Edit</Button></Container>
    } else if (this.state.edit === true) {
      return <EmployeeForm employee={this.state.employee} formToggle={this.formToggle} refresh={this.refresh} />
    }
  }

  refresh = () => {
    APICalls.getOneFromCategory("employees", this.props.match.params.employeeId)
      .then(employee => {
        this.setState({
          employee: employee,
          edit: false
        })
      })

  }




  render() {
    return (
      <Container>
        <h1>Employees</h1>
        <dl className="row">
          <dt className="col-sm-3">Employee Name</dt>
          <dd className="col-sm-9">{this.state.employee.first_name} {this.state.employee.last_name}</dd>

          <dt className="col-sm-3">Start Date</dt>
          <dd className="col-sm-9">{this.state.employee.start_date}</dd>

          <dt className="col-sm-3">End Date</dt>
          <dd className="col-sm-9">{this.state.employee.end_date}</dd>

          {(this.state.employee.is_supervisor === true)
            ? <>
              <dt className="col-sm-3">Supervisor</dt>
              <dd className="col-sm-9">Yes</dd>
            </>
            : null
          }
          {(this.state.employee.department)
            ? <>
              <dt className="col-sm-3">Department Name</dt>
              <dd className="col-sm-9">{this.state.employee.department.name}</dd>
            </>
            : null}


          {(this.state.employee.current_computer)
            ? <>
              <dt className="col-sm-3">Current Computer</dt>
              <dd className="col-sm-9">{this.state.employee.current_computer.computer.make} {this.state.employee.current_computer.computer.model} {this.state.employee.current_computer.computer.serial_no}</dd>
            </>
            : null}
        </dl>
        {this.employeeFormHolder()}

      </Container>
    )
  }
}

export default EmployeeDetailPage

EmployeeDetailPage.propTypes = {
  match: PropTypes.object

}
