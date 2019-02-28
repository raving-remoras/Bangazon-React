import React, { Component } from "react"
import {Container, Form, FormGroup, Label, Input, Button} from "reactstrap"
import APICalls from "../../../../modules/APICalls"
import PropTypes from "prop-types"
// import { stat } from "fs";

class OrderForm extends Component {
  state = {
    customer: "",
    payment_type: "",
    payment_date: "",
  }

  componentDidMount = ()=>{
    this.refreshData()
    if(this.props.order){
      this.setState({
        customer: this.props.customer,
        payment_type: this.props.payment_type,
        payment_date : this.props.payment_date
      })
    }
  }

  refreshData = ()=>{
    APICalls.getAllFromCategory("customers")
      .then(customers => this.setState({ customers }))
      .then(()=> APICalls.getAllFromCategory("paymenttypes"))
      .then(payment_types => this.setState({ payment_types }))
  }

  handleFieldChange = (evt) =>{
    const stateToChange = {}
    if(evt.target.id === "customer"){
      let full_name = evt.target.value.split(" ")
      stateToChange["customer"] = {}
      stateToChange["customer"]["first_name"] = full_name[0]
      stateToChange["customer"]["last_name"] = full_name[1]
    } else{
      stateToChange[evt.target.id] = evt.target.value
    }
    this.setState(stateToChange)
  }

  addOrder = () => {
    const customer = this.state.customers.find(c => c.first_name === this.state.customer.first_name && c.last_name === this.state.customer.last_name)

    let obj = {}
    if(this.state.payment_type){
      const payment_type = this.state.payment_types.find(pt => pt.name === this.state.payment_type)

      obj = {
        customer: customer.url,
        payment_type: payment_type.url,
        payment_date: this.state.payment_date
      }
    } else{
      obj = {
        customer: customer.url
      }
    }
    return APICalls.post("orders", obj)
      .then(()=> this.props.refresh())
  }

  customerDropDown = (customers) => {
    return(
      customers
        ? <Input type="select" name="customerSelect" id="customer" value={`${this.state.customer.first_name} ${this.state.customer.last_name}`}>
          <option>{null}</option>
          {
            customers.map(customer => {
              return(
                <option key={customer.url}>
                  {customer.first_name} {customer.last_name}
                </option>
              )
            })
          }
        </Input>
        : null
    )
  }

  paymentTypeDropDown = (payment_types) => {
    return(
      payment_types
        ? <Input type="select" name="paymentTypeSelect" id="payment_type" value={this.state.payment_type}>
          <option>{null}</option>
          {
            payment_types.map(payment_type => {
              return(
                <option key={payment_type.url}>
                  {payment_type.name}
                </option>
              )
            })
          }
        </Input>
        : null
    )
  }


  render() {
    return (
      <>
        <Container>
          <Form className="form"
            onSubmit={(evt)=>{
              evt.preventDefault()
              {
                (this.props.order)
                  ? this.updateOrder()
                    .then(()=> this.props.toggle())
                  : this.addOrder()
                    .then(()=> this.props.toggle())
              }
            }}
            onChange={(evt)=> this.handleFieldChange(evt)}
          >
            <FormGroup>
              <Label>Customer</Label>
              {this.customerDropDown(this.state.customers)}
            </FormGroup>
            <FormGroup>
              <Label>Payment Type</Label>
              {this.paymentTypeDropDown(this.state.payment_types)}
            </FormGroup>
            <FormGroup>
              <Label>Payment Date</Label>
              <Input type="datetime-local" name="payment_date" id="payment_date" onChange={(evt) => this.handleFieldChange(evt)} defaultValue={this.state.payment_date} />
            </FormGroup>
            <Button color="primary" type="submit">Save</Button>
          </Form>
        </Container>
        <h1>Order Form</h1>
      </>
    )
  }
}

export default OrderForm

OrderForm.propTypes = {
  toggle: PropTypes.func.isRequired,
  refresh: PropTypes.func.isRequired,
  order: PropTypes.object,
  customer: PropTypes.object,
  payment_type: PropTypes.string,
  payment_date: PropTypes.string
}