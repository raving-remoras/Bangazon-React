import React, { Component } from "react"
import PropTypes from "prop-types"
import { ListGroupItem, Col, Row } from "reactstrap"


class EmployeeListComponent extends Component {




  render() {
    return (
      <>
        <ListGroupItem tag="a" href={`/hr/employee/${this.props.employee.id}`} action>
          <Row>
            <Col>
              <p>{this.props.employee.first_name}</p>
            </Col>
            <Col>
              <p>{this.props.employee.last_name}</p>
            </Col>

          </Row>
        </ListGroupItem>
      </>
    )
  }


}

EmployeeListComponent.propTypes = {
  employee:PropTypes.object
}

export default EmployeeListComponent