import React, { Component } from "react"
import { Container, Button} from "reactstrap"
import APICalls from "../../../modules/APICalls"
import ComputerForm from "./computerForm"
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
          (this.state.edit === false)
            ? <Button color="primary" onClick={() => this.toggleEdit()}>Edit Computer</Button>
            : <Button color="danger" onClick={() => this.toggleEdit()}>Cancel</Button>
        }
        {
          (this.state.isLoaded == true)
            ?
            <Container>
              <p>Make: {this.state.computer.make}</p>
              <p>Model: {this.state.computer.model}</p>
              <p>Serial No: {this.state.computer.serial_no}</p>
              <p>Purchase Date: {this.state.computer.purchase_date}</p>
              <p>Retire Date: {this.state.computer.retire_date}</p>
            </Container>
            : null
        }

      </>
    )
  }
}

export default ComputerDetail