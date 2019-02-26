import React, { Component } from "react"
import {Form, FormGroup, Label, Input, Button} from "reactstrap"
import APICalls from "../../../../modules/APICalls"

class ProductForm extends Component {
  state = {  }

  componentDidMount = ()=>{
    this.refreshData()
  }

  refreshData = () => {
    APICalls.getAllFromCategory("producttypes")
      .then(product_types => this.setState({ product_types}))
      .then(()=> APICalls.getAllFromCategory("customers"))
      .then(customers => this.setState({ customers }))
  }


  productTypeDropDown = (productTypes)=>{
    return (
      productTypes
        ? <Input type="select" name="productTypeSelect">
          <option> {null} </option>
          {
            productTypes.map(productType => {
              return(
                <option key={productType.url}>{productType.name}</option>
              )
            })
          }
        </Input>
        : null
    )
  }

  customerDropDown = (customers)=>{
    return (
      customers
        ? <Input type="select" name="productTypeSelect">
          <option> {null} </option>
          {
            customers.map(customer => {
              return(
                <option key={customer.url}>{customer.first_name} {customer.last_name}</option>
              )
            })
          }
        </Input>
        : null
    )
  }

  render() {
    return (
      <Form>
        <FormGroup>
          <Label>Seller</Label>
          {this.customerDropDown(this.state.customers)}
        </FormGroup>
        <FormGroup>
          <Label>Product Type</Label>
          {this.productTypeDropDown(this.state.product_types)}
        </FormGroup>
        <FormGroup>
          <Label>Title</Label>
          <Input type="text" name="title" />
        </FormGroup>
        <FormGroup>
          <Label>Description</Label>
          <Input type="textarea" name="text"/>
        </FormGroup>
        <FormGroup>
          <Label>Price</Label>
          <Input type="text" name="price"/>
        </FormGroup>
        <FormGroup>
          <Label>Quantity</Label>
          <Input type="text" name="quantity"/>
        </FormGroup>
        <Button>Save</Button>
      </Form>

    )
  }
}

export default ProductForm

// * [ ]  On the new product form, a user has the option to select from pre-existing customers (sellers) and product types
// * [ ]   Once the user selects a customer or product type, they have the affordance to edit that entity (see edit form for customer #39 and product type #27 )
// * [ ]   A user can also add a new customer or  product type from the add order page (see add form for customer #38 and product type #26 )
// * [ ]   The user has the option to "save and add another" product-- which performs a put then routes to a new product add form, "save and continue editing", or "save"-- which routes back to product list
