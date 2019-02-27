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
    title: "",
    max_attendees: "",
    start_date: "",
    end_date: null
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
      title: this.state.title,
      max_attendees: this.state.max_attendees,
      start_date: this.state.start_date,
      end_date: this.state.end_date
    }

    return APICalls.post("trainings", obj)
      .then(() => this.props.refresh())
  }

  updateTraining = () => {
    //Method creates object from state (set in handleFieldChange and/or componentDidMount) and performs a PUT the item selected
    let obj = {
      title: this.state.title,
      max_attendees: this.state.max_attendees,
      start_date: this.state.start_date,
      end_date: this.state.end_date
    }

    return APICalls.update("trainings", obj, this.props.training.id)
      .then(() => this.props.refresh())
  }

  componentDidMount() {
    //Method sets state with existing training values if the form is being used to edit. These values will go back with the PUT if they aren't changed
    if (this.props.training){
      this.setState({
        title: this.props.training.title,
        max_attendees: this.props.training.max_attendees,
        start_date: this.props.training.start_date,
        end_date: this.props.training.end_date,
      })
    }
  }

  render() {
    return(
      <Form
        id="trainingForm"
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
          <Label for="title">Title</Label>
          <Input type="text" name="title" id="title" required onChange={(e) => this.handleFieldChange(e)} defaultValue={this.state.title} />
        </FormGroup>
        <FormGroup>
          <Label for="max_attendees">Max Attendees</Label>
          <Input type="number" name="max_attendees" id="max_attendees" required onChange={(e) => this.handleFieldChange(e)} defaultValue={this.state.max_attendees} />
        </FormGroup>
        <FormGroup>
          <Label for="start_date">Start Date</Label>
          <Input type="datetime-local" name="start_date" id="start_date" required onChange={(e) => this.handleFieldChange(e)} defaultValue={this.state.start_date} />
        </FormGroup>
        <FormGroup>
          <Label for="end_date">End Date</Label>
          <Input type="datetime-local" name="end_date" id="end_date" onChange={(e) => this.handleFieldChange(e)} required defaultValue={this.state.end_date} />
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