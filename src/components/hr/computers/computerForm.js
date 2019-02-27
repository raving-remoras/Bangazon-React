import React, { Component } from "react"
import { Button, Form, FormGroup, Label, Input, } from "reactstrap"
import APICalls from "../../../modules/APICalls"
import PropTypes from "prop-types"


class ComputerForm extends Component {
  /*
    Class renders the computer form. If "computer" is passed as props, it will contain default values of the item currently being edited and will perform a PUT, otherwise it will be blank and perform a POST.

    Props are inherited from Computers

    Author: Rachel Daniel
  */

  state = {
    make: "",
    model: "",
    serial_no: "",
    purchase_date: "",
    retire_date: null
  }

  handleFieldChange = e => {
    //function uses ids of form fields as keys, creates an object with input as value, and sets state
    const stateToChange = {}
    stateToChange[e.target.id] = e.target.value
    this.setState(stateToChange)
  }

  addComputer = () => {
    //Method creates object from state (set in handleFieldChange and/or componentDidMount) and performs a POST to computer table
    let obj = {
      make: this.state.make,
      model: this.state.model,
      serial_no: this.state.serial_no,
      purchase_date: this.state.purchase_date,
      retire_date: this.state.retire_date
    }

    return APICalls.post("computers", obj)
      .then(() => this.props.refresh())
  }

  updateComputer = () => {
    //Method creates object from state (set in handleFieldChange and/or componentDidMount) and performs a PUT the item selected
    let obj = {
      make: this.state.make,
      model: this.state.model,
      serial_no: this.state.serial_no,
      purchase_date: this.state.purchase_date,
      retire_date: this.state.retire_date
    }

    return APICalls.update("computers", obj, this.props.computer.id)
      .then(() => this.props.refresh())
  }

  componentDidMount() {
    //Method sets state with existing computer values if the form is being used to edit. These values will go back with the PUT if they aren't changed
    if (this.props.computer){
      this.setState({
        make: this.props.computer.make,
        model: this.props.computer.model,
        serial_no: this.props.computer.serial_no,
        purchase_date: this.props.computer.purchase_date,
        retire_date: this.props.computer.retire_date,
      })
    }
  }

  render() {
    return(
      <Form
        id="compForm"
        onSubmit={(e) => {
          e.preventDefault()
          {
            (this.props.computer)
              ? this.updateComputer()
                .then(()=> this.props.toggle())
              : this.addComputer()
                .then(()=> this.props.toggle())
          }
        }}
      >
        <FormGroup>
          <Label for="make">Make</Label>
          <Input type="text" name="make" id="make" required onChange={(e) => this.handleFieldChange(e)} defaultValue={this.state.make} />
        </FormGroup>
        <FormGroup>
          <Label for="model">Model</Label>
          <Input type="text" name="model" id="model" required onChange={(e) => this.handleFieldChange(e)} defaultValue={this.state.model} />
        </FormGroup>
        <FormGroup>
          <Label for="serial_no">Serial Number</Label>
          <Input type="text" name="serial_no" id="serial_no" required onChange={(e) => this.handleFieldChange(e)} defaultValue={this.state.serial_no} />
        </FormGroup>
        <FormGroup>
          <Label for="purchase_date">Purchase Date</Label>
          <Input type="datetime-local" name="purchase_date" id="purchase_date" required onChange={(e) => this.handleFieldChange(e)} defaultValue={this.state.purchase_date} />
        </FormGroup>
        <FormGroup>
          <Label for="date">Retire Date</Label>
          <Input type="datetime-local" name="date" id="date" onChange={(e) => this.handleFieldChange(e)} defaultValue={this.state.retire_date} />
        </FormGroup>

        <Button color="primary" type="submit">Save</Button>

      </Form>
    )
  }

}

export default ComputerForm

ComputerForm.propTypes = {
  toggle: PropTypes.func.isRequired,
  refresh: PropTypes.func.isRequired,
  computer: PropTypes.object
}