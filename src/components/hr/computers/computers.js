import React, { Component } from "react"
import { ListGroup, ListGroupItem, Row, Col} from "reactstrap"
import APICalls from "../../../modules/APICalls"
import ComputerItem from "./computerItem"
import ComputerForm from "./computerForm"

class Computers extends Component {
  state = {
    add: true,
    edit: ""
  }

  getComputers = () => {
    APICalls.getAllFromCategory("computers")
      .then((computers) => {
        this.setState({computers: computers})
      })
  }

  componentDidMount() {
    this.getComputers()
  }

  render() {
    return (
      <>
        <h1>Computers</h1>
      {
        (this.state.add === true)
          ? <ComputerForm/>
          : null
      }
      {
        (this.state.computers)
          ? <ListGroup>
            <ListGroupItem color="info">
              <Row>
                <Col xs={4} className=" d-flex align-items-center text-center">
                  <h6>Make</h6>

                </Col>
                <Col xs={4} className=" d-flex align-items-center text-center">
                  <h6>Model</h6>

                </Col>
                <Col xs={4} className=" d-flex align-items-center text-center">
                  <h6>Serial No.</h6>

                </Col>

              </Row>

            </ListGroupItem>
            {
              this.state.computers.map(computer =>
                <ComputerItem key={computer.id}
                  computer={computer}
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

export default Computers