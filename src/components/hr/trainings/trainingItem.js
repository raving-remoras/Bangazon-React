import React, { Component } from "react"
import { ListGroupItem, Row, Col } from "reactstrap"
import PropTypes from "prop-types"


class TrainingItem extends Component {
  /*
    Class renders individual training list items. Props are inherited from trainings.

    Author: Rachel Daniel
  */
  render() {
    return (
      <ListGroupItem tag="a" href={`/hr/trainings/${this.props.training.id}`} action>
        <Row>
          <Col xs={3} className=" d-flex align-items-center">
            {this.props.training.title}

          </Col>
          <Col xs={3} className=" d-flex align-items-center">
            {this.props.training.max_attendees}

          </Col>
          <Col xs={3} className=" d-flex align-items-center">
            {this.props.training.start_date}

          </Col>
          <Col xs={3} className=" d-flex align-items-center">
            {this.props.training.end_date}

          </Col>

        </Row>
      </ListGroupItem>
    )
  }

}

export default TrainingItem

TrainingItem.propTypes = {
  training: PropTypes.object.isRequired
}