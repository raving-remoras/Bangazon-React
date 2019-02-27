import React, { Component } from "react"
import { ListGroupItem, Row, Col } from "reactstrap"
import PropTypes from "prop-types"


class DepartmentItem extends Component {
  /*
    Class renders individual department list items. Props are inherited from departments.

    Author: Rachel Daniel
  */
  render() {
    return (
      <ListGroupItem tag="a" href={`/hr/departments/${this.props.department.id}`} action>
        <Row>
          <Col xs={6} className=" d-flex align-items-center text-center">
            {this.props.department.name}

          </Col>
          <Col xs={6} className=" d-flex align-items-center text-center">
            {this.props.department.budget}

          </Col>
        </Row>
      </ListGroupItem>
    )
  }

}

export default DepartmentItem

DepartmentItem.propTypes = {
  department: PropTypes.object.isRequired
}