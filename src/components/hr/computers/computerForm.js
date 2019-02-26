import React, { Component } from "react"
import { Button, Form, FormGroup, Label, Input, } from "reactstrap"
import APICalls from "../../../modules/APICalls"
import PropTypes from "prop-types"

class ComputerForm extends Component {

  state = {
    make: "",
    model: "",
    serial_no: "",
    purchase_date: "",
    retire_date: null
  }

  //function uses ids of form fields as keys, creates an object with input as value, and sets state
  handleFieldChange = e => {
    const stateToChange = {}
    stateToChange[e.target.id] = e.target.value
    this.setState(stateToChange)
  }

  addComputer = () => {

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

  componentDidMount() {
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
      <Form>
        <FormGroup>
          <Label for="make">Make</Label>
          <Input type="text" name="make" id="make" required onChange={(e) => this.handleFieldChange(e)} placeholder={this.state.make} />
        </FormGroup>
        <FormGroup>
          <Label for="model">Model</Label>
          <Input type="text" name="model" id="model" required onChange={(e) => this.handleFieldChange(e)} placeholder={this.state.model} />
        </FormGroup>
        <FormGroup>
          <Label for="serial_no">Serial Number</Label>
          <Input type="text" name="serial_no" id="serial_no" required onChange={(e) => this.handleFieldChange(e)} placeholder={this.state.serial_no} />
        </FormGroup>
        <FormGroup>
          <Label for="purchase_date">Purchase Date</Label>
          <Input type="datetime-local" name="purchase_date" id="purchase_date" required onChange={(e) => this.handleFieldChange(e)} placeholder={this.state.purchase_date} />
        </FormGroup>
        <FormGroup>
          <Label for="date">Retire Date</Label>
          <Input type="datetime-local" name="date" id="date" onChange={(e) => this.handleFieldChange(e)} placeholder={this.state.retire_date} />
        </FormGroup>
        <Button onClick={() => {
          this.addComputer()
            .then(()=> this.props.toggleAdd())
        }}>Save</Button>
      </Form>
    )
  }

}

export default ComputerForm

ComputerForm.propTypes = {
  toggleAdd: PropTypes.func.isRequired,
  refresh: PropTypes.func.isRequired,
  computer: PropTypes.object
}