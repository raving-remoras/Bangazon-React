import React, { Component } from "react"
import { Button, Container} from "reactstrap"
import APICalls from "../../../modules/APICalls"
import TrainingForm from "./trainingForm"
import PropTypes from "prop-types"

class TrainingDetail extends Component {
  /*
    Class renders detail page-- props come from trainings class

    Author: Rachel Daniel
  */
  state = {
    isLoaded: false,
    edit: false
  }

  getTraining = () => {
    //Method fetches training details associated with training item selected from list page, then sets state

    APICalls.getOneFromCategory("trainings", parseInt(this.props.match.params.trainingId))
      .then((training) => {
        this.setState({training: training, isLoaded: true})
      })

  }

  toggleEdit = () => {
    //Method sets state according to whether edit form should be visible
    this.setState({edit: !this.state.edit})


  }

  componentDidMount(){
    this.getTraining()
  }

  render() {
    return(
      <>
        <Container className="text-center" id="trainingEdit">
          {
            (this.state.edit === false)
              ? <Button color="primary" onClick={() => this.toggleEdit()}>Edit Training</Button>
              : <Button color="danger" onClick={() => this.toggleEdit()}>Cancel</Button>
          }
        </Container>
        {
          (this.state.edit === true)
            ? <TrainingForm
              training={this.state.training}
              toggle={this.toggleEdit}
              refresh={this.gettraining}
            />
            : null
        }
        {
          (this.state.isLoaded === true)
            ?
            <dl className="row" id="trainingDetail">
              <dt className="col-sm-6">Title:</dt>
              <dd className="col-sm-6">{this.state.training.title}</dd>
              <dt className="col-sm-6">Start Date:</dt>
              <dd className="col-sm-6">{this.state.training.start_date}</dd>
              <dt className="col-sm-6">End Date:</dt>
              <dd className="col-sm-6">{this.state.training.end_date}</dd>
              <dt className="col-sm-6">Max attendees:</dt>
              <dd className="col-sm-6">{this.state.training.max_attendees}</dd>
            </dl>
            : null
        }

      </>
    )
  }
}

export default TrainingDetail

TrainingDetail.propTypes = {
  match: PropTypes.object.isRequired
}