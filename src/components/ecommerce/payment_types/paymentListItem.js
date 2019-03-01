/**
 * Handles displaying a single payment type on the main payment types view
 * Author: Sebastian Civarolo
 */

import React, { Component } from "react"
import PropTypes from "prop-types"

import {
  Row,
  Col,
  ListGroupItem,
} from "reactstrap"

class PaymentListItem extends Component {
  state = {  }
  render() {

    const { paymentType } = this.props

    return (
      <ListGroupItem className="mb-3" tag="a" href={`paymenttypes/${paymentType.id}`} action>
        <Row>
          <Col lg={2}>
            <h6>{paymentType.customer_id}</h6>
          </Col>
          <Col lg={4}>
            <h6>{paymentType.name}</h6>
          </Col>
          <Col lg={3}>
            <h6>{`***${paymentType.account_number.toString().slice(-4)}`}</h6>
          </Col>
          <Col lg={3}><h6>{paymentType.delete_date}</h6></Col>
        </Row>
      </ListGroupItem>
    )
  }
}

export default PaymentListItem

PaymentListItem.propTypes = {
  paymentType: PropTypes.object.isRequired,
}