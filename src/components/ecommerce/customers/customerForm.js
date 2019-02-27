import React, { Component } from "react"
import PropTypes from "prop-types"
import {
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button
} from "reactstrap"
import APICalls from "../../../modules/APICalls"

class CustomerForm extends Component {

  state = {
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    street_address: "",
    city: "",
    state: "",
    zipcode: "",
    phone_number: "",
    join_date: "",
    delete_date: "",
  }

  componentDidMount() {
    if (this.props.customer) {
      for (let key in this.props.customer) {
        this.setState({[key]: this.props.customer[key]})
      }
    }
  }

  handleFieldChange = e => {
    const newState = {}
    newState[e.target.id] = e.target.value
    this.setState(newState)
  }

  submitForm = (e, data) => {
    e.preventDefault()
    let obj = {}
    for (let key in data) {
      if (key !== "product" && key !== "used_paymenttypes") {
        obj[key] = data[key]
      }
    }
    return APICalls.update("customers", obj, this.props.customer.id)
      .then((customer) => this.props.loadCustomer(customer.id))
      .then(() => this.props.toggleEdit())
  }

  render() {

    return (

      <Form onSubmit={e => this.submitForm(e, this.state)} onChange={this.handleFieldChange}>
        <Row form>
          <Col md={6}>
            <FormGroup>
              <Label for="first_name">First Name</Label>
              <Input type="text" name="first_name" id="first_name" defaultValue={this.state.first_name} />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="last_name">Last Name</Label>
              <Input type="text" name="last_name" id="last_name" defaultValue={this.state.last_name} />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="email">E-mail</Label>
              <Input type="text" name="email" id="email" defaultValue={this.state.email} />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="username">Username</Label>
              <Input type="text" name="username" id="username" defaultValue={this.state.username} />
            </FormGroup>
          </Col>
          <Col md={12}>
            <FormGroup>
              <Label for="street_address">Street Address</Label>
              <Input type="text" name="street_address" id="street_address" defaultValue={this.state.street_address} />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="city">City</Label>
              <Input type="text" name="city" id="city" defaultValue={this.state.city} />
            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup>
              <Label for="state">State</Label>
              <Input type="text" name="state" id="state" defaultValue={this.state.state} />
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <Label for="label">Zip Code</Label>
              <Input type="text" name="zipcode" id="zipcode" defaultValue={this.state.zipcode} />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="join_date">Join Date</Label>
              <Input type="datetime-local" name="join_date" id="join_date" defaultValue={this.state.join_date} />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="delete_date">Delete Date</Label>
              <Input type="datetime-local" name="delete_date" id="delete_date" defaultValue={this.state.delete_date} />
            </FormGroup>
          </Col>
          <Button type="submit">Save Changes</Button>
        </Row>
      </Form>
    )
  }
}

export default CustomerForm

CustomerForm.propTypes = {
  customer: PropTypes.object,
  loadCustomer: PropTypes.func,
  toggleEdit: PropTypes.func
}