import React, { Component } from "react"
import { Container } from "reactstrap"
import APICalls from "../../../modules/APICalls"
import { ListGroup, ListGroupItem, Row, Col, Button } from "reactstrap"
import EmployeeForm from "./EmployeeForm"
import PropTypes from "prop-types"



class EmployeeDetailPage extends Component {
  state = {
    employee: {},
    edit: false
  }

  componentDidMount() {
    this.refresh()
  }

  formToggle= ()=>{
    this.setState({edit: !this.state.edit})
  }

  employeeFormHolder(){
    if(this.state.edit === false){
      return <Button onClick={()=>this.formToggle()}>+</Button>
    }else if(this.state.edit === true){
      return <EmployeeForm formToggle={this.formToggle} refresh={this.refresh}/>
    }
  }

  refresh = () => {
    APICalls.getOneFromCategory("employees", this.props.match.params.employeeId)
      .then(employees => this.setState({
        employees: employees,
        edit: false
      }))

  }

  render() {
    return (
      <Container>
        <h1>Employees</h1>
        {this.employeeFormHolder()}
        <dl className="row">
          <dt className="col-sm-3">Employee Name</dt>
          <dd className="col-sm-9">{this.state.employee.first_name} {this.state.employee.last_name}</dd>

        </dl>
      </Container>
    )
  }
}

export default EmployeeDetailPage

EmployeeDetailPage.propTypes = {
  match: PropTypes.object

}
