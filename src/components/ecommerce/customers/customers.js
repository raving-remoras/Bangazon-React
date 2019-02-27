/**
 * Allows user to interact with the api/v1/customers/ endpoint.
 * Gets a list of customers based on a set of parameters available on the page.
 *
 * Author: Sebastian Civarolo
 */

import React, { Component } from "react"
import {
  Button,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  ListGroup,
  ListGroupItem,
  CustomInput,
  Row,
  Col
} from "reactstrap"

import APICalls from "../../../modules/APICalls"
import CustomerListItem from "./customerListItem"

class Customers extends Component {

  state = {
    customers: [],
    productsSwitch: false,
    paymentsSwitch: false,
    activeSwitch: false,
    inactiveSwitch: false,
    queryNames: [],
    queryParams: [],
    displayingSearchResults: false,
    searchQuery: "",
  }

  componentDidMount() {
    APICalls.getAllFromCategoryWithQuery("customers", ["_include"], ["products,payments"])
      .then(customers => this.setState({customers}))
  }

  // Checks which filters are toggled
  onChangeToggle = (e) => {

    this.setState({
      [e.target.id] : !this.state[e.target.id]
    })

    if(e.target.id === "activeSwitch") {
      this.setState({
        inactiveSwitch: false
      })
    }

    if(e.target.id === "inactiveSwitch") {
      this.setState({
        activeSwitch: false
      })
    }

    if(e.target.id === "inactiveSwitch" || e.target.id === "activeSwitch") {
      this.updateQueryParams(e)
    }

  }

  // Called by onToggleChange when active/inactive is toggled to fetch a new set of customers
  updateQueryParams = (e) => {
    let queryNames = ["_include"]
    let queryParams = ["products,payments"]

    if (e.target.id === "activeSwitch" && e.target.checked) {
      queryNames.push("active")
      queryParams.push("true")
    }
    if (e.target.id === "inactiveSwitch" && e.target.checked) {
      queryNames.push("active")
      queryParams.push("false")
    }

    this.setState({queryNames: queryNames, queryParams: queryParams})
    return APICalls.getAllFromCategoryWithQuery("customers", queryNames, queryParams)
      .then(customers => this.setState({customers}))

  }

  submitSearch = (e) => {
    e.preventDefault()
    return APICalls.getAllFromCategoryWithQuery("customers", ["_include", "q"], ["products,payments", this.state.searchQuery])
      .then(customers => this.setState({
        customers: customers,
        displayingSearchResults: true,
        activeSwitch: false,
        inactiveSwitch: false
      }))
  }

  searchQuery = e => {
    this.setState({searchQuery: e.target.value})
  }

  clearSearch = (e) => {
    return APICalls.getAllFromCategoryWithQuery("customers", ["_include"], ["products,payments"])
      .then(customers => this.setState({
        customers: customers,
        displayingSearchResults: false,
        activeSwitch: false,
        inactiveSwitch: false,
        searchQuery: ""
      }))
  }

  // Handles displaying the list of customers. Called in render()
  CustomersList = customers => {
    return (
      <ListGroup>
        <ListGroupItem color="info">
          <Row>
            <Col lg={2}><h6>Full Name</h6></Col>
            <Col lg={3}><h6>E-mail</h6></Col>
            <Col lg={1}><h6>Username</h6></Col>
            <Col lg={2}><h6>Address</h6></Col>
            <Col lg={2} className="d-none d-lg-block"><h6>Phone</h6></Col>
            <Col lg={2}><h6>Join Date</h6></Col>
          </Row>
        </ListGroupItem>
        {
          customers
            ? customers.map((customer, i) => {
              return (<CustomerListItem key={i} customer={customer} showProducts={this.state.productsSwitch} showPayments={this.state.paymentsSwitch} />)
            })
            : null
        }
      </ListGroup>
    )
  }

  render() {
    return (
      <Container className="mb-5">
        <Row>
          <Col className="mb-3" lg={6}>
            <h1>Customers</h1>
          </Col>
          <Col className="mb-3" lg={6}>
            <Form onChange={this.searchQuery} onSubmit={this.submitSearch}>
              <InputGroup>
                <Input type="text" id="customerSearch" name="customerSearch" placeholder="Search Customers" />
                <InputGroupAddon addonType="append">
                  <Button type="submit" color="primary">Search</Button>
                </InputGroupAddon>
              </InputGroup>
            </Form>

          </Col>
        </Row>
        <Row>
          <Col className="d-lg-flex">
            <div className="mr-4">
              <CustomInput onChange={this.onChangeToggle} type="switch" id="productsSwitch" name="customSwitch" label="Include Products" className="mb-3" checked={this.state.productsSwitch} />
            </div>
            <div className="mr-4">
              <CustomInput onChange={this.onChangeToggle} type="switch" id="paymentsSwitch" name="customSwitch" label="Include Payment Types" className="mb-3" checked={this.state.paymentsSwitch} />
            </div>
            <div className="mr-4">
              <CustomInput onChange={this.onChangeToggle} type="switch" id="activeSwitch" name="customSwitch" label="Only Active" className="mb-3" checked={this.state.activeSwitch} />
            </div>
            <div className="mr-4">
              <CustomInput onChange={this.onChangeToggle} type="switch" id="inactiveSwitch" name="customSwitch" label="Only Inactive" className="mb-3" checked={this.state.inactiveSwitch} />
            </div>
            <div className="ml-auto">
              <Button className="ml-2 mb-3" color="success" tag="a" href="/ecommerce/customers/new">Create New Customer</Button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            {
              this.state.displayingSearchResults && !this.state.customers.length
                ? <h4>{`No results matching "${this.state.searchQuery}"`}</h4>
                : this.CustomersList(this.state.customers)

            }
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Customers