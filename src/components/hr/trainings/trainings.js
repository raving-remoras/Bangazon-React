import React, { Component } from "react"
import { Button, ListGroup, ListGroupItem, Row, Col, Container} from "reactstrap"
import APICalls from "../../../modules/APICalls"
import TrainingItem from "./trainingItem"
import TrainingForm from "./trainingForm"

class Trainings extends Component {
  /*
    Class renders training list page, passes props to Training Item for individual referencing, as well as trainingForm

    Author: Rachel Daniel
  */
  state = {
    add: false,
  }

  getTrainings = () => {
    //Method fetches all trainings, then sets state
    APICalls.getAllFromCategory("trainings")
      .then((trainings) => {
        this.setState({trainings: trainings})
      })
  }

  toggleAdd = () => {
    //Method sets state according to whether add form should be visible
    this.setState({add: !this.state.add})
  }

  componentDidMount() {
    this.getTrainings()
  }

  render() {
    return (
      <>
        <Container className="text-center">
          <h1 id="trainingHead">Trainings</h1>
        </Container>
        <Container className="text-center" id="trainingAdd">
          {
            (this.state.add === false)
              ? <Button color="primary" onClick={() => this.toggleAdd()}>Add Training</Button>
              : <Button color="danger" onClick={() => this.toggleAdd()}>Cancel</Button>
          }
        </Container>
      {
        (this.state.add === true)
          ? <TrainingForm
            toggle={this.toggleAdd}
            refresh={this.getTrainings}
          />
          : null
      }
      {
        (this.state.trainings)
          ? <ListGroup id="trainingList">
            <ListGroupItem color="info">
              <Row>
                <Col xs={3} className=" d-flex align-items-center text-center">
                  <h6>Title</h6>

                </Col>
                <Col xs={3} className=" d-flex align-items-center text-center">
                  <h6>Max Attendees</h6>

                </Col>
                <Col xs={3} className=" d-flex align-items-center text-center">
                  <h6>Start Date</h6>

                </Col>
                <Col xs={3} className=" d-flex align-items-center text-center">
                  <h6>End Date</h6>

                </Col>

              </Row>

            </ListGroupItem>
            {
              this.state.trainings.map(training =>
                <TrainingItem key={training.id}
                  training={training}
                  {...this.props}

                />)
            }

          </ListGroup>
          : null
      }



      </>
    )
  }
}

export default Trainings