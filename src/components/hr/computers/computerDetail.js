import React, { Component } from "react"
import { Container} from "reactstrap"
import APICalls from "../../../modules/APICalls"
class ComputerDetail extends Component {
  state = {
    isLoaded: false
  }

  getComputer = () => {
    APICalls.getOneFromCategory("computers", parseInt(this.props.match.params.compId))
      .then((computer) => {
        this.setState({computer: computer, isLoaded: true})
      })

  }

  componentDidMount(){
    this.getComputer()
  }

  render() {
    return(
      <>
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