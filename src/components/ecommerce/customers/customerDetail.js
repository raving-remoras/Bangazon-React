/**
 * Displays the details of a single customer at /customers/customerId
 * Conditionally display products and payment types.
 *
 * Author: Sebastian Civarolo
 */

import React, { Component } from "react"
import PropTypes from "prop-types"
import {
  Button,
  Container,
  Row,
  Col,
  CustomInput,
  ListGroup,
  ListGroupItem
} from "reactstrap"

import APICalls from "../../../modules/APICalls"
import CustomerForm from "./customerForm"

class CustomerDetail extends Component {
  state = {
    customer: {},
    productsSwitch: false,
    paymentsSwitch: false,
    editSwitch: false
  }

  componentDidMount() {
    return this.loadCustomer(this.props.match.params.customerId)
  }

  onChangeToggle = (e) => {
    this.setState({
      [e.target.id] : !this.state[e.target.id]
    })
  }

  toggleEdit = () => {
    this.setState({editSwitch: !this.state.editSwitch})
  }

  loadCustomer = (customerId) => {
    return APICalls.getOneFromCategoryWithQuery("customers", customerId, "_include", "payments,products")
      .then(customer => this.setState({customer}))
  }

  pageHeadings(customer) {
    return <>
    <Row>
      <Col className="mb-5">
        <h1>Customer Detail: {customer.username}</h1>
      </Col>
    </Row>
    <Row>
      <Col>
        <h2 className="mb-3">Customer Information</h2>
      </Col>
      <Col className="text-right">
        <Button color="primary" id="editSwitch" onClick={this.toggleEdit}>
          {this.state.editSwitch ? "Cancel Edit" : "Edit Customer"}
        </Button>
      </Col>
    </Row>
    </>
  }

  customerRender(customer) {
    return (
      <>
      {this.pageHeadings(customer)}
      <Row>
        <dl className="col-md-3">
          <dt>First Name</dt>
          <dd>{customer.first_name}</dd>
        </dl>
        <dl className="col-md-3">
          <dt>Last Name</dt>
          <dd>{customer.last_name}</dd>
        </dl>
        <dl className="col-md-3">
          <dt>Address</dt>
          <dd>{customer.street_address}<br />
            {customer.city}, {customer.state} {customer.zipcode}
          </dd>
        </dl>
        <dl className="col-md-3">
          <dt>Phone Number</dt>
          <dd>{customer.phone_number}</dd>
        </dl>
        <dl className="col-md-3">
          <dt>Username</dt>
          <dd>{customer.username}</dd>
        </dl>
        <dl className="col-md-3">
          <dt>E-mail</dt>
          <dd>{customer.email}</dd>
        </dl>
        <dl className="col-md-3">
          <dt>Join Date</dt>
          <dd>{customer.join_date}</dd>
        </dl>
        <dl className="col-md-3">
          <dt>Delete Date</dt>
          <dd>{customer.delete_date ? customer.delete_date : "Active User"}</dd>
        </dl>
      </Row>
      <Row className="mt-4">
        <Col lg={6} className="mb-4">
          <h3>Products</h3>
          <CustomInput onChange={this.onChangeToggle} type="switch" id="productsSwitch" name="customSwitch" label="Include Products" className="mb-3" />
          {
            this.state.productsSwitch
              ? customer.product.length
                ? (
                  <ListGroup>
                    {
                      customer.product.map((product, i) => {
                        return <ListGroupItem key={i} tag="a" href={`/ecommerce/products/${product.id}`} action>{product.title}</ListGroupItem>
                      })
                    }
                  </ListGroup>
                )
                : <p>No Products for this Customer</p>
              : null
          }
        </Col>
        <Col lg={6} className="mb-4">
          <h3>Used Payment Types</h3>
          <CustomInput onChange={this.onChangeToggle} type="switch" id="paymentsSwitch" name="customSwitch" label="Include Payment Types" className="mb-3" />
          {
            this.state.paymentsSwitch
              ? customer.used_paymenttypes.length
                ? (
                  <ListGroup>
                    {
                      customer.used_paymenttypes.map((payment, i) => {
                        return <ListGroupItem key={i} tag="a" action href={`/ecommerce/paymenttypes/${payment.id}`}>{payment.name}</ListGroupItem>
                      })
                    }
                  </ListGroup>
                )
                : <p>No Used Payment Types for this Customer</p>
              : null
          }

        </Col>
      </Row>
      </>
    )
  }

  editRender = (customer) => {
    return <>
      {this.pageHeadings(customer)}
      <CustomerForm customer={customer} toggleEdit={this.toggleEdit} loadCustomer={this.loadCustomer} />
    </>
  }

  render() {
    const { customer } = this.state

    return (
      <Container>
        {
          customer.detail ? <h1>No Customer Found</h1>
            : this.state.editSwitch
              ? this.editRender(customer)
              : this.customerRender(customer)
        }
      </Container>
    )
  }
}

export default CustomerDetail

CustomerDetail.propTypes = {
  match: PropTypes.object
}