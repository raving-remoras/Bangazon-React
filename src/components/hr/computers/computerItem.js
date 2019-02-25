import React, { Component } from "react"
import { ListGroupItem, Row, Col } from "reactstrap"
import PropTypes from "prop-types"
// import { Link } from "react-router-dom"


class ComputerItem extends Component {
  render() {
    return (
      <ListGroupItem tag="a" href="#" action>
        <Row>
          <Col xs={4} className=" d-flex align-items-center text-center">
            {this.props.computer.make}

          </Col>
          <Col xs={4} className=" d-flex align-items-center text-center">
            {this.props.computer.model}

          </Col>
          <Col xs={4} className=" d-flex align-items-center text-center">
            {this.props.computer.serial_no}

          </Col>

        </Row>
      </ListGroupItem>
    )
  }

}

export default ComputerItem

ComputerItem.propTypes = {
  computer: PropTypes.object.isRequired
}