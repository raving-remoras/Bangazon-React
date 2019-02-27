import React, { Component } from "react"
import { Button, Form, FormGroup, Label, Input, } from "reactstrap"
import APICalls from "../../../modules/APICalls"
import PropTypes from "prop-types"


class TrainingForm extends Component {
  /*
    Class renders the training form. If "training" is passed as props, it will contain default values of the item currently being edited and will perform a PUT, otherwise it will be blank and perform a POST.

    Props are inherited from trainings

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

  addTraining = () => {
    //Method creates object from state (set in handleFieldChange and/or componentDidMount) and performs a POST to training table
    let obj = {
      make: this.state.make,
      model: this.state.model,
      serial_no: this.state.serial_no,
      purchase_date: this.state.purchase_date,
      retire_date: this.state.retire_date
    }

    return APICalls.post("trainings", obj)
      .then(() => this.props.refresh())
  }

  updateTraining = () => {
    //Method creates object from state (set in handleFieldChange and/or componentDidMount) and performs a PUT the item selected
    let obj = {
      make: this.state.make,
      model: this.state.model,
      serial_no: this.state.serial_no,
      purchase_date: this.state.purchase_date,
      retire_date: this.state.retire_date
    }

    return APICalls.update("trainings", obj, this.props.training.id)
      .then(() => this.props.refresh())
  }

  componentDidMount() {
    //Method sets state with existing training values if the form is being used to edit. These values will go back with the PUT if they aren't changed
    if (this.props.Training){
      this.setState({
        make: this.props.training.make,
        model: this.props.training.model,
        serial_no: this.props.training.serial_no,
        purchase_date: this.props.training.purchase_date,
        retire_date: this.props.training.retire_date,
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
            (this.props.training)
              ? this.updateTraining()
                .then(()=> this.props.toggle())
              : this.addTraining()
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
          <Label for="retire_date">Retire Date</Label>
          <Input type="datetime-local" name="retire_date" id="retire_date" onChange={(e) => this.handleFieldChange(e)} defaultValue={this.state.retire_date} />
        </FormGroup>

        <Button color="primary" type="submit">Save</Button>

      </Form>
    )
  }

}

export default TrainingForm

TrainingForm.propTypes = {
  toggle: PropTypes.func.isRequired,
  refresh: PropTypes.func.isRequired,
  training: PropTypes.object
}