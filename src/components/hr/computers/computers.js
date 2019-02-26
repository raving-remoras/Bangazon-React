import React, { Component } from "react"
import { Button, ListGroup, ListGroupItem, Row, Col} from "reactstrap"
import APICalls from "../../../modules/APICalls"
import ComputerItem from "./computerItem"
import ComputerForm from "./computerForm"

class Computers extends Component {
  state = {
    add: false,
  }

  getComputers = () => {
    APICalls.getAllFromCategory("computers")
      .then((computers) => {
        this.setState({computers: computers})
      })
  }

  toggleAdd = () => {
    this.setState({add: !this.state.add})
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
          ? <ComputerForm
            toggle={this.toggleAdd}
            refresh={this.getComputers}
          />
          : null
      }
        {
          (this.state.add === false)
            ? <Button color="primary" onClick={() => this.toggleAdd()}>Add Computer</Button>
            : <Button color="danger" onClick={() => this.toggleAdd()}>Cancel</Button>
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