import React, { Component } from "react"
import {
  Row,
  Col,
  Container
} from "reactstrap"
import PaymentTypeForm from "./paymentTypeForm"


class NewPaymentType extends Component {
  render() {
    return (
      <Container>
        <Row>
          <Col className="mb-5">
            <h1>New Payment Type</h1>
          </Col>
        </Row>
        <PaymentTypeForm {...this.props} />
      </Container>
    )
  }
}

export default NewPaymentType