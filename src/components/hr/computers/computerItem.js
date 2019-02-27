import React, { Component } from "react"
import { ListGroupItem, Row, Col } from "reactstrap"
import PropTypes from "prop-types"


class ComputerItem extends Component {
  /*
    Class renders individual computer list items. Props are inherited from Computers.

    Author: Rachel Daniel
  */
  render() {
    return (
      <ListGroupItem tag="a" href={`/hr/computers/${this.props.computer.id}`} action>
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