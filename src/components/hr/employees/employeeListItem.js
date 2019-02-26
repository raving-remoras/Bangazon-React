import React, { Component } from "react"
import PropTypes from "prop-types"

import {
  Row,
  Col,
  ListGroupItem
} from "reactstrap"

class EmployeeListItem extends Component {

  state = {  }

  render() {

    const { employee } = this.props

    return (
      <ListGroupItem tag="a" href={`employees/${employee.id}`} action>
        <Row>
          <Col>
            {employee.first_name} {employee.last_name}
          </Col>
          <Col>
            {employee.start_date}
          </Col>
          <Col>
            {employee.end_date}
          </Col>
          <Col>
            {employee.department.name}
          </Col>
          <Col className="d-none d-lg-block">
            {
              employee.current_computer
                ? `${employee.current_computer.computer.make} ${employee.current_computer.computer.model}`
                : null
            }
          </Col>
        </Row>
      </ListGroupItem>
    )

  }
}

export default EmployeeListItem

EmployeeListItem.propTypes = {
  employee: PropTypes.object.isRequired
}