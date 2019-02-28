import React, { Component } from "react"
import { ListGroupItem, Row, Col, ListGroup } from "reactstrap"
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
            ${this.props.department.budget.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}

          </Col>
        </Row>
        <Row>
          {
            (this.props.showEmployees === true)
              ? <Col className="mt-3">
                <h6 className="text-black-50">Employees</h6>
                <ListGroup className="mt-2 mb-1">
                  {
                    (this.props.department.employees.length)
                      ? this.props.department.employees.map(employee =>

                        <ListGroupItem key={employee.id}>
                          {employee.first_name} {employee.last_name}
                        </ListGroupItem>

                      )
                      :
                      <ListGroupItem>Department has no employees.</ListGroupItem>
                  }
                </ListGroup>
              </Col>
              : null
          }
        </Row>
      </ListGroupItem>
    )
  }

}

export default DepartmentItem

DepartmentItem.propTypes = {
  department: PropTypes.object.isRequired,
  showEmployees: PropTypes.bool.isRequired
}