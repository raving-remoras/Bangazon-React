import React, { Component } from "react"
import { Button, ListGroup, ListGroupItem, Row, Col, Container} from "reactstrap"
import APICalls from "../../../modules/APICalls"
import ComputerItem from "./computerItem"
import ComputerForm from "./computerForm"

class Computers extends Component {
  /*
    Class renders computer list page, passes props to Computer Item for individual referencing, as well as ComputerForm

    Author: Rachel Daniel
  */
  state = {
    add: false,
  }

  getComputers = () => {
    //Method fetches all computers, then sets state
    APICalls.getAllFromCategory("computers")
      .then((computers) => {
        this.setState({computers: computers})
      })
  }

  toggleAdd = () => {
    //Method sets state according to whether add form should be visible
    this.setState({add: !this.state.add})
  }

  componentDidMount() {
    this.getComputers()
  }

  render() {
    return (
      <>
        <Container className="text-center">
          <h1 >Computers</h1>
        </Container>
        <Container className="text-center addButton">
          {
            (this.state.add === false)
              ? <Button color="primary" onClick={() => this.toggleAdd()}>Add Computer</Button>
              : <Button color="danger" onClick={() => this.toggleAdd()}>Cancel</Button>
          }
        </Container>
      {
        (this.state.add === true)
          ? <ComputerForm
            toggle={this.toggleAdd}
            refresh={this.getComputers}
          />
          : null
      }
      {
        (this.state.computers)
          ? <ListGroup className="listItems">
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