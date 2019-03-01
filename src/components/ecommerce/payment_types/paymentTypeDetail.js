import React, { Component } from "react"
import PropTypes from "prop-types"
import {
  Button,
  Container,
  Row,
  Col,
} from "reactstrap"

import APICalls from "../../../modules/APICalls"
import PaymentTypeForm from "./paymentTypeForm"

class PaymentTypeDetail extends Component {

  state = {
    paymentType: {},
    editSwitch: false
  }

  componentDidMount() {
    return this.loadPaymentType(this.props.match.params.paymentTypeId)
  }

  loadPaymentType = (paymentTypeId) => {
    return APICalls.getOneFromCategory("paymenttypes", paymentTypeId)
      .then(paymentType => this.setState({paymentType}))
  }

  toggleEdit = () => {
    this.setState({editSwitch: !this.state.editSwitch})
  }

  pageHeading = () => {
    return (
      <>
        <Row>
          <Col className="mb-5">
            <h1>Payment Type Detail</h1>
          </Col>
          <Col className="text-right">
            <Button color="primary" id="editSwitch" onClick={this.toggleEdit}>
              {this.state.editSwitch ? "Cancel Edit" : "Edit Payment Type"}
            </Button>
          </Col>
        </Row>
        <Row>
        </Row>
      </>
    )
  }

  paymentTypeRender = (paymentType) => {
    return (
      <Row>
        <dl className="col-md-3">
          <dt>Customer</dt>
          <dd><a href={`/ecommerce/customers/${paymentType.customer_id}`}>{paymentType.customer_id}</a></dd>
        </dl>
        <dl className="col-md-3">
          <dt>Payment Name</dt>
          <dd>{paymentType.name}</dd>
        </dl>
        <dl className="col-md-3">
          <dt>Account Number</dt>
          { paymentType.account_number
            ? <dd>{`***${paymentType.account_number.toString().slice(-4)}`}</dd>
            : null
          }
        </dl>
        <dl className="col-md-3">
          <dt>Delete Date</dt>
          <dd>{paymentType.delete_date}</dd>
        </dl>
      </Row>
    )
  }

  render() {
    const {paymentType} = this.state

    return (
      <Container>
        {this.pageHeading()}

        {
          paymentType.detail
            ? <h1>No PaymentType Found</h1>
            : this.state.editSwitch
              ? <PaymentTypeForm paymentType={paymentType} toggleEdit={this.toggleEdit} loadPaymentType={this.loadPaymentType} />
              : this.paymentTypeRender(this.state.paymentType)
        }
      </Container>
    )
  }
}

export default PaymentTypeDetail

PaymentTypeDetail.propTypes = {
  match: PropTypes.object.isRequired
}