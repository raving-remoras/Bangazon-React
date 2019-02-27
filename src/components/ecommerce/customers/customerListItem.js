/**
 * Displays a single entry from the api/v1/customers/ query.
 *
 * Author: Sebastian Civarolo
 */

import React, { Component } from "react"
import PropTypes from "prop-types"

import {
  Row,
  Col,
  ListGroupItem,
  ListGroup
} from "reactstrap"

class CustomerListItem extends Component {

  // If products toggled, display products for each customer
  productsList = (products) => {
    return (
      <Col className="mt-3">
        <h6 className="text-black-50">Products</h6>
        <ListGroup className="mt-2 mb-1">
          {
            products.length
              ? products.map((product, i) => {
                return (
                  <ListGroupItem key={i}>
                    {product.title}
                  </ListGroupItem>
                )
              })
              : <ListGroupItem>Customer has no products for sale.</ListGroupItem>
          }
        </ListGroup>
      </Col>
    )
  }

  // If used payment types toggled, display used payment types for each customer.
  paymentsList = (payments) => {
    return (
      <Col className="mt-3">
        <h6 className="text-black-50">Used Payment Types</h6>
        <ListGroup className="mt-2 mb-1">
          {
            payments.length
              ? payments.map((payment, i) => {
                return (
                  <ListGroupItem key={i}>
                    {payment.name}
                  </ListGroupItem>
                )
              })
              : <ListGroupItem>Customer has no used payment types.</ListGroupItem>
          }
        </ListGroup>
      </Col>
    )
  }


  render() {

    const { customer } = this.props


    return (
      <ListGroupItem className="mb-3" tag="a" href={`customers/${customer.id}`} action>
        <Row>
          <Col lg={2}>
            <h6>{customer.first_name} {customer.last_name}</h6>
          </Col>
          <Col lg={3}>
            {customer.email}
          </Col>
          <Col lg={1}>
            {customer.username}
          </Col>
          <Col lg={2}>
            {customer.street_address}<br />
            {customer.city}, {customer.state} {customer.zipcode}
          </Col>
          <Col lg={2} className="d-none d-lg-block">
            {customer.phone_number}
          </Col>
          <Col lg={2} className="d-none d-lg-block">
            {customer.join_date}
          </Col>
        </Row>
        <Row>
          {
            this.props.showProducts
              ? this.productsList(this.props.customer.product)
              : null
          }
          {
            this.props.showPayments
              ? this.paymentsList(this.props.customer.used_paymenttypes)
              : null
          }
        </Row>
      </ListGroupItem>
    )

  }
}

export default CustomerListItem

CustomerListItem.propTypes = {
  customer: PropTypes.object.isRequired,
  showProducts: PropTypes.bool,
  showPayments: PropTypes.bool
}