import React, { Component } from "react"
import {
  Row,
  Col,
  Container
} from "reactstrap"
import CustomerForm from "./customerForm";

class NewCustomer extends Component {
  render() {
    return (
      <Container>
        <Row>
          <Col className="mb-5">
            <h1>New Customer</h1>
          </Col>
        </Row>
        <CustomerForm {...this.props} />
      </Container>
    )
  }
}

export default NewCustomer