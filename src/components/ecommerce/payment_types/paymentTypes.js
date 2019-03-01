/**
 * Displays a list of payment types
 * Author: Sebastian Civarolo
 */

import React, { Component } from "react"
import APICalls from "../../../modules/APICalls"
import {
  Container,
  Row,
  Col,
  Button,
  ListGroup,
  ListGroupItem,
} from "reactstrap"

import PaymentListItem from "./paymentListItem"

class PaymentTypes extends Component {
  state = {
    paymentTypes: []
  }

  componentDidMount() {
    APICalls.getAllFromCategory("paymenttypes")
      .then(paymentTypes => this.setState({paymentTypes}))
  }

  paymentList = (paymentTypes) => {
    return (
      <ListGroup>
        <ListGroupItem color="info">
          <Row>
            <Col lg={2}><h6>Customer</h6></Col>
            <Col lg={4}><h6>Payment Name</h6></Col>
            <Col lg={3}><h6>Account Number</h6></Col>
            <Col lg={3}><h6>Delete Date</h6></Col>
          </Row>
        </ListGroupItem>
        {
          paymentTypes
            ? paymentTypes.map((payment, i) => {
              return (
                <PaymentListItem key={i} paymentType={payment} />
              )
            })
            : null
        }
      </ListGroup>
    )
  }

  render() {
    return (
      <Container className="mb-5">
        <Row>
          <Col className="mb-3" lg={6}>
            <h1>Payment Types</h1>
          </Col>
          <Col className="mb-3" lg={6}>
            <div className="ml-auto text-right">
              <Button className="ml-2 mb-3" color="success" tag="a" href="/ecommerce/paymenttypes/new">Create New Payment Type</Button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            {
              this.state.paymentTypes.length
                ? this.paymentList(this.state.paymentTypes)
                : "There are no payment types in the database."
            }
          </Col>
        </Row>
      </Container>
    )
  }
}

export default PaymentTypes