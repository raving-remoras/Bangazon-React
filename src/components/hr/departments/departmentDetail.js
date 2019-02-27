import React, { Component } from "react"
import { Button, Container} from "reactstrap"
import APICalls from "../../../modules/APICalls"
import DepartmentForm from "./departmentForm"
import PropTypes from "prop-types"
class DepartmentDetail extends Component {
  /*
    Class renders detail page-- props come from Departments class

    Author: Rachel Daniel
  */
  state = {
    isLoaded: false,
    edit: false
  }

  getDepartment = () => {
    //Method fetches department details associated with department item selected from list page, then sets state

    APICalls.getOneFromCategory("departments", parseInt(this.props.match.params.deptId))
      .then((department) => {
        this.setState({department: department, isLoaded: true})
      })

  }

  toggleEdit = () => {
    //Method sets state according to whether edit form should be visible
    this.setState({edit: !this.state.edit})


  }

  componentDidMount(){
    this.getDepartment()
  }

  render() {
    return(
      <>
        <Container className="text-center" id="deptEdit">
          {
            (this.state.edit === false)
              ? <Button color="primary" onClick={() => this.toggleEdit()}>Edit department</Button>
              : <Button color="danger" onClick={() => this.toggleEdit()}>Cancel</Button>
          }
        </Container>
        {
          (this.state.edit === true)
            ? <DepartmentForm
              department={this.state.department}
              toggle={this.toggleEdit}
              refresh={this.getDepartment}
            />
            : null
        }
        {
          (this.state.isLoaded === true)
            ?
            <dl className="row" id="deptDetail">
              <dt className="col-sm-6">Name:</dt>
              <dd className="col-sm-6">{this.state.department.name}</dd>
              <dt className="col-sm-6">Budget:</dt>
              <dd className="col-sm-6">${this.state.department.budget.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}</dd>
            </dl>
            : null
        }

      </>
    )
  }
}

export default DepartmentDetail

DepartmentDetail.propTypes = {
  match: PropTypes.object.isRequired
}