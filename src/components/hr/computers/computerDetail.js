import React, { Component } from "react"
import { Button, Container} from "reactstrap"
import APICalls from "../../../modules/APICalls"
import ComputerForm from "./computerForm"
import PropTypes from "prop-types"
class ComputerDetail extends Component {
  state = {
    isLoaded: false,
    edit: false
  }

  getComputer = () => {
    APICalls.getOneFromCategory("computers", parseInt(this.props.match.params.compId))
      .then((computer) => {
        this.setState({computer: computer, isLoaded: true})
      })

  }

  toggleEdit = () => {
    this.setState({edit: !this.state.edit})


  }

  componentDidMount(){
    this.getComputer()
  }

  render() {
    return(
      <>
        <Container className="text-center" id="compEdit">
          {
            (this.state.edit === false)
              ? <Button color="primary" onClick={() => this.toggleEdit()}>Edit Computer</Button>
              : <Button color="danger" onClick={() => this.toggleEdit()}>Cancel</Button>
          }
        </Container>
        {
          (this.state.edit === true)
            ? <ComputerForm
              computer={this.state.computer}
              toggle={this.toggleEdit}
              refresh={this.getComputer}
            />
            : null
        }
        {
          (this.state.isLoaded === true)
            ?
            <dl className="row" id="compDetail">
              <dt className="col-sm-6">Make:</dt>
              <dd className="col-sm-6">{this.state.computer.make}</dd>
              <dt className="col-sm-6">Model:</dt>
              <dd className="col-sm-6">{this.state.computer.model}</dd>
              <dt className="col-sm-6">Serial No:</dt>
              <dd className="col-sm-6">{this.state.computer.serial_no}</dd>
              <dt className="col-sm-6">Purchase Date:</dt>
              <dd className="col-sm-6">{this.state.computer.purchase_date}</dd>
              <dt className="col-sm-6">Retire Date:</dt>
              <dd className="col-sm-6">{this.state.computer.retire_date}</dd>
            </dl>
            : null
        }

      </>
    )
  }
}

export default ComputerDetail

ComputerDetail.propTypes = {
  match: PropTypes.object.isRequired
}