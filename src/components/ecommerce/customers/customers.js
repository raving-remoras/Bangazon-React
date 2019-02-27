import React, { Component } from "react"
import {
  Button,
  Container,
  ListGroup,
  ListGroupItem,
  Row,
  Col
} from "reactstrap"

import APICalls from "../../../modules/APICalls"
import CustomerListItem from "./customerListItem"

class Customers extends Component {

  state = {
    employees: []
  }

  componentDidMount() {
    APICalls.getAllFromCategory("customers")
      .then(customers => this.setState({customers}))
  }

  CustomersList = customers => {
    return (
      <ListGroup>
        <ListGroupItem color="info">
          <Row>
            <Col lg={2}><h6>Full Name</h6></Col>
            <Col lg={3}><h6>E-mail</h6></Col>
            <Col lg={1}><h6>Username</h6></Col>
            <Col lg={2}><h6>Address</h6></Col>
            <Col lg={2} className="d-none d-lg-block"><h6>Phone</h6></Col>
            <Col lg={2}><h6>Join Date</h6></Col>
          </Row>
        </ListGroupItem>
        {
          customers
            ? customers.map((customer, i) => {
              return (<CustomerListItem key={i} customer={customer} />)
            })
            : null
        }
      </ListGroup>
    )
  }

  render() {
    return (
      <Container>
        <Row>
          <Col className="mb-5">
            <h1>Customers</h1>
          </Col>
          <Col md="6" className="text-right">
            <Button className="ml-auto">Search</Button>
            <Button className="ml-2">Filter</Button>
            <Button className="ml-2">Create</Button>
          </Col>
        </Row>
        <Row>
          <Col>
            {this.CustomersList(this.state.customers)}
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Customers