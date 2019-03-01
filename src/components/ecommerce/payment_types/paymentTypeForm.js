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

class PaymentTypeForm extends Component {

  state = {
    customer: "",
    name: "",
    account_number: "",
    delete_date: "",
  }

  componentDidMount() {
    APICalls.getAllFromCategory("customers")
      .then((customers) => {this.setState({customers})})
    if (this.props.paymentType) {
      for (let key in this.props.paymentType) {
        this.setState({[key]: this.props.paymentType[key]})
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
      if (key !== "customer_id" && key !== "customers") {
        obj[key] = data[key]
      }
    }
    obj.delete_date = obj.delete_date || null
    if (this.props.paymentType) {
      return APICalls.update("paymenttypes", obj, this.props.paymentType.id)
        .then(paymentType => this.props.loadPaymentType(paymentType.id))
        .then(() => this.props.toggleEdit())
    } else {
      return APICalls.post("paymenttypes", obj)
        .then(() => this.props.history.push("/ecommerce/paymenttypes"))
    }
  }

  render() {
    return (
      <Form onSubmit={e => this.submitForm(e, this.state)} onChange={this.handleFieldChange}>
        <Row form>
          <Col md={6}>
            <FormGroup>
              <Label for="customer">Customer</Label>
              <Input type="select" name="customer" id="customer" required={true} defaultValue={this.state.customer.url}>
                {
                  this.state.customers
                    ? this.state.customers.map((customer, i) => {
                      if (customer.id === this.state.customer_id) {
                        return (<option key={i} id={customer.id} value={customer.url} selected={true}>{customer.id} {customer.first_name} {customer.last_name}</option>)
                      }
                      return (<option key={i} id={customer.id} value={customer.url}>{customer.id} {customer.first_name} {customer.last_name}</option>)
                    })
                    : null
                }
              </Input>
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="name">Payment Name</Label>
              <Input type="text" name="name" id="name" required={true} defaultValue={this.state.name} />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="account_number">Account Number</Label>
              <Input type="number" name="account_number" id="account_number" defaultValue={this.state.account_number} required={true} />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="delete_date">Delete Date</Label>
              <Input type="datetime-local" name="delete_date" id="delete_date" defaultValue={this.state.delete_date} />
            </FormGroup>
          </Col>
          <Col>
            <Button type="submit">Save Changes</Button>
          </Col>
        </Row>
      </Form>
    )
  }

}

export default PaymentTypeForm

PaymentTypeForm.propTypes = {
  paymentType: PropTypes.object,
  loadPaymentType: PropTypes.func,
  toggleEdit: PropTypes.func,
  history: PropTypes.object.isRequired,
}