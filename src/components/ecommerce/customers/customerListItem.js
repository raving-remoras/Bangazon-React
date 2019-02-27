import React, { Component } from "react"
import PropTypes from "prop-types"

import {
  Row,
  Col,
  ListGroupItem
} from "reactstrap"

class CustomerListItem extends Component {

  state = {  }

  render() {

    const { customer } = this.props

    return (
      <ListGroupItem tag="a" href={`customers/${customer.id}`} action>
        <Row>
          <Col lg={2}>
            {customer.first_name} {customer.last_name}
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
      </ListGroupItem>
    )

  }
}

export default CustomerListItem

CustomerListItem.propTypes = {
  customer: PropTypes.object.isRequired
}