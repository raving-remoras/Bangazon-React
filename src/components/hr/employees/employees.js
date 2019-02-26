/**
 * Purpose: Handles the view for all Employees from /api/v1/employees
 * Author: Sebastian Civarolo
 */

import React, { Component } from "react"
import {
  Container,
  Col,
  Row,
} from "reactstrap"

class Employees extends Component {

  state = { }

  render() {
    return (
      <Container>
        <Row>
          <Col className="mb-5">
            <h1>Employees</h1>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Employees