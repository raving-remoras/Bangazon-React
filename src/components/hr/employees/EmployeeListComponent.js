/**
 * Purpose: Handles dislplaying a single employee /api/v1/employees/[id]
 * Author: Sebastian Civarolo and Jase Hackman
 */

import React, { Component } from "react"
import PropTypes from "prop-types"
import { ListGroupItem, Col, Row } from "reactstrap"


class EmployeeListComponent extends Component {


  render() {
    return (
      <>
        <ListGroupItem tag="a" href={`/hr/employees/${this.props.employee.id}`} action>
          <Row>
            <Col>
              <p>{this.props.employee.first_name}</p>
            </Col>
            <Col>
              <p>{this.props.employee.last_name}</p>
            </Col>
            <Col>
              <p>{this.props.employee.start_date}</p>
            </Col>
            <Col>
              <p>{this.props.employee.end_date}</p>
            </Col>
            <Col>
              {(this.props.employee.is_supervisor)
                ? <p>Yes</p>
                : <p>No</p>
              }

            </Col>
            <Col>
              {(this.props.employee.department)
                ? <p>{this.props.employee.department.name}</p>
                : <p>None</p>
              }
            </Col>
            <Col>
              {(this.props.employee.current_computer)
                ? <dl className="row">
                  <dd className="col-sm-9">{this.props.employee.current_computer.computer.make}</dd>

                  <dd className="col-sm-9">{this.props.employee.current_computer.computer.model}</dd>

                  <dd className="col-sm-9">{this.props.employee.current_computer.computer.serial_no}</dd>
                </dl>
                : <p>None</p>
              }
            </Col>



          </Row>
        </ListGroupItem>
      </>
    )
  }
}

EmployeeListComponent.propTypes = {
  employee: PropTypes.object
}

export default EmployeeListComponent