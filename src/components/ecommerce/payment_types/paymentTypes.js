import React, { Component } from "react"
import APICalls from "../../../modules/APICalls"
import {
  Container,
  Row,
  Col,
  Button,
} from "reactstrap"
class PaymentTypes extends Component {
  state = {
    paymentTypes: []
  }

  componentDidMount() {
    APICalls.getAllFromCategory("paymenttypes")
      .then(paymentTypes => this.setState({paymentTypes}))
  }

  render() {
    return (
      <Container className="mb-5">
        <Row>
          <Col className="mb-3" lg={6}>
            <h1>Payment Types</h1>
          </Col>
          <Col className="mb-3" lg={6}>
            <div className="ml-auto">
              <Button className="ml-2 mb-3" color="success" tag="a" href="/ecommerce/customers/new">Create New Customer</Button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            {/* {
              this.state.displayingSearchResults && !this.state.customers.length
                ? <h4>{`No results matching "${this.state.searchQuery}"`}</h4>
                : this.CustomersList(this.state.customers)

            } */}
          </Col>
        </Row>
      </Container>
    )
  }
}

export default PaymentTypes