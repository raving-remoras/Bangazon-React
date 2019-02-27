import React, { Component } from "react"
import { Button, Form, FormGroup, Label, Input, } from "reactstrap"
import APICalls from "../../../modules/APICalls"
import PropTypes from "prop-types"


class DepartmentForm extends Component {
  /*
    Class renders the department form. If "department" is passed as props, it will contain default values of the item currently being edited and will perform a PUT, otherwise it will be blank and perform a POST.

    Props are inherited from departments

    Author: Rachel Daniel
  */

  state = {
    name: "",
    budget: "",
  }

  handleFieldChange = e => {
    //function uses ids of form fields as keys, creates an object with input as value, and sets state
    const stateToChange = {}
    stateToChange[e.target.id] = e.target.value
    this.setState(stateToChange)
  }

  addDepartment = () => {
    //Method creates object from state (set in handleFieldChange and/or componentDidMount) and performs a POST to department table
    let obj = {
      name: this.state.name,
      budget: this.state.budget,
    }

    return APICalls.post("departments", obj)
      .then(() => this.props.refresh())
  }

  updateDepartment = () => {
    //Method creates object from state (set in handleFieldChange and/or componentDidMount) and performs a PUT the item selected
    let obj = {
      name: this.state.name,
      budget: this.state.budget,
    }

    return APICalls.update("departments", obj, this.props.department.id)
      .then(() => this.props.refresh())
  }

  componentDidMount() {
    //Method sets state with existing department values if the form is being used to edit. These values will go back with the PUT if they aren't changed
    if (this.props.department){
      this.setState({
        name: this.props.department.name,
        budget: this.props.department.budget,
      })
    }
  }

  render() {
    return(
      <Form
        id="deptForm"
        onSubmit={(e) => {
          e.preventDefault()
          {
            (this.props.department)
              ? this.updateDepartment()
                .then(()=> this.props.toggle())
              : this.addDepartment()
                .then(()=> this.props.toggle())
          }
        }}
      >
        <FormGroup>
          <Label for="name">Name</Label>
          <Input type="text" name="name" id="name" required onChange={(e) => this.handleFieldChange(e)} defaultValue={this.state.name} />
        </FormGroup>
        <FormGroup>
          <Label for="budget">Budget</Label>
          <Input type="number" name="budget" id="budget" required onChange={(e) => this.handleFieldChange(e)} defaultValue={this.state.budget} />
        </FormGroup>
        <Button color="primary" type="submit">Save</Button>

      </Form>
    )
  }

}

export default DepartmentForm

DepartmentForm.propTypes = {
  toggle: PropTypes.func.isRequired,
  refresh: PropTypes.func.isRequired,
  department: PropTypes.object
}