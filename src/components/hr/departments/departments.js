import React, { Component } from "react"
import { Button, ListGroup, ListGroupItem, Row, Col, Container, CustomInput, Form, FormGroup, Label, Input} from "reactstrap"
import APICalls from "../../../modules/APICalls"
import DepartmentItem from "./departmentItem"
import DepartmentForm from "./departmentForm"

class Departments extends Component {
  /*
    Class renders department list page, passes props to Department Item for individual referencing, as well as departmentForm

    Author: Rachel Daniel
  */
  state = {
    add: false,
    employeeSwitch: false
  }

  getDepartments = () => {
    //Method fetches all departments, then sets state
    APICalls.getAllFromCategoryWithQuery("departments", "_include", "employees")
      .then((departments) => {
        this.setState({departments: departments})
      })
  }

  toggleAdd = () => {
    //Method sets state according to whether add form should be visible
    this.setState({add: !this.state.add})
  }

  toggleEmployee = () => {
    //Method sets state according to whether add form should be visible
    this.setState({employeeSwitch: !this.state.employeeSwitch})
  }

  handleFieldChange = e => {
    //function uses ids of form fields as keys, creates an object with input as value, and sets state
    const stateToChange = {}
    stateToChange[e.target.id] = e.target.value
    this.setState(stateToChange)
  }

  searchByBudget = () => {
    APICalls.getAllFromCategoryWithQuery("departments", "_filter", `budget&_gt=${this.state.budget}&_include=employees`)
      .then((departments) => {
        this.setState({departments: departments})
      })
  }

  componentDidMount() {
    this.getDepartments()
  }

  render() {
    return (
      <>
        <Container className="text-center">
          <h1 id="deptHead">Departments</h1>
        </Container>
        <Container className="filterGroup">
          <CustomInput onChange={this.toggleEmployee} type="switch" id="employeeSwitch" name="customSwitch" label="Include Employees" className="mb-3" checked={this.state.employeeSwitch} />
          <Form
            onSubmit={(e) => {
              e.preventDefault()
              this.searchByBudget()
            }}
          >
            <FormGroup>
              <Label for="budget">Minimum Budget</Label>
              <Input type="number" name="budget" id="budget" required onChange={(e) => this.handleFieldChange(e)} />
            </FormGroup>
            <Button color="primary" type="submit">Search</Button>
            <Button color="info"
              onClick={()=> this.getDepartments()}
            >Reset</Button>
          </Form>
        </Container>
        <Container className="text-center addButton">
          {
            (this.state.add === false)
              ? <Button color="primary" onClick={() => this.toggleAdd()}>Add department</Button>
              : <Button color="danger" onClick={() => this.toggleAdd()}>Cancel</Button>
          }
        </Container>
      {
        (this.state.add === true)
          ? <DepartmentForm
            toggle={this.toggleAdd}
            refresh={this.getDepartments}
          />
          : null
      }
      {
        (this.state.departments)
          ? <ListGroup className="listItems">
            <ListGroupItem color="info">
              <Row>
                <Col xs={6} className=" d-flex align-items-center text-center">
                  <h6>Name</h6>

                </Col>
                <Col xs={6} className=" d-flex align-items-center text-center">
                  <h6>Budget</h6>

                </Col>

              </Row>

            </ListGroupItem>
            {
              this.state.departments.map(department =>
                <DepartmentItem key={department.id}
                  showEmployees={this.state.employeeSwitch}
                  department={department}
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

export default Departments