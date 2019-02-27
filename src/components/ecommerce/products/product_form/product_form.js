import React, { Component } from "react"
import {Form, FormGroup, Label, Input, Button, Container} from "reactstrap"
import APICalls from "../../../../modules/APICalls"
import PropTypes from "prop-types"
// import { stat } from "fs";

class ProductForm extends Component {
  state = {
    title: "",
    description: "",
    price: "",
    quantity: "",
    product_type: "",
    seller: ""
  }

  componentDidMount = ()=>{
    this.refreshData()
    if (this.props.product){
      this.setState({
        title: this.props.product.title,
        description: this.props.product.description,
        price: this.props.product.price,
        quantity: this.props.product.quantity,
        product_type: this.props.product_type.name,
        seller: {
          first_name: this.props.product.seller.first_name,
          last_name: this.props.product.seller.last_name
        }
      })
    }
  }

  // function uses ids of form fields as keys, creates an object with input as value and sets state
  handleFieldChange = evt => {
    const stateToChange = {
      seller: {}
    }
    if (evt.target.id === "seller"){
      let full_name = evt.target.value.split(" ")
      stateToChange["seller"]["first_name"] = full_name[0]
      stateToChange["seller"].last_name = full_name[1]
    }
    else{
      stateToChange[evt.target.id] = evt.target.value
    }
    this.setState(stateToChange)
  }

  // function uses state to create a new product, and posts it to the database
  // TODO: Figure out how to work with foreign keys for customer and producttype
  // TODO: Come back and fix object to pull in all relevant data
  // addProduct = () => {
  //   let obj = {

  //   }

  //   return APICalls.post("products", obj)
  //     .then(()=> this.props.refresh())
  // }

  // function uses state to create an updated object for an existing product and performs a PUT on the database
  // updateProduct = () =>{
  //   let obj = {

  //   }

  //   return APICalls.update("products", obj, this.props.product.id)
  //     .then(()=> this.props.refresh())
  // }


  refreshData = () => {
    APICalls.getAllFromCategory("producttypes")
      .then(product_types => this.setState({ product_types}))
      .then(()=> APICalls.getAllFromCategory("customers"))
      .then(customers => this.setState({ customers }))
  }


  productTypeDropDown = (productTypes)=>{
    return (
      productTypes
        ? <Input type="select" name="productTypeSelect" id="productType" value={this.state.product_type}>
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
        ? <Input type="select" name="productTypeSelect" id="seller" value={`${this.state.seller.first_name} ${this.state.seller.last_name}`}>
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
      <Container>
        <Form
          onSubmit={(evt)=> {
            evt.preventDefault()
            {
              (this.props.product)
                ? this.updateProduct()
                  .then(()=> this.props.toggle())
                : this.addProduct()
                  .then(()=> this.props.toggle())
            }
          }}
          onChange={(evt)=> this.handleFieldChange(evt)}
        >
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
            <Input type="text" name="title" id="title" required defaultValue={this.state.title}/>
          </FormGroup>
          <FormGroup>
            <Label>Description</Label>
            <Input type="textarea" name="description" id="description" required value={this.state.description}/>
          </FormGroup>
          <FormGroup>
            <Label>Price</Label>
            <Input type="text" name="price" id="price" required defaultValue={this.state.price}/>
          </FormGroup>
          <FormGroup>
            <Label>Quantity</Label>
            <Input type="text" name="quantity" id="quantity" required defaultValue={this.state.quantity}/>
          </FormGroup>
          <Button color="primary" type="submit">Save</Button>
        </Form>
      </Container>
    )
  }
}

export default ProductForm

ProductForm.propTypes = {
  toggle: PropTypes.func.isRequired,
  refresh: PropTypes.func.isRequired,
  product: PropTypes.object,
  product_type: PropTypes.object
}

// * [ ]  On the new product form, a user has the option to select from pre-existing customers (sellers) and product types
// * [ ]   Once the user selects a customer or product type, they have the affordance to edit that entity (see edit form for customer #39 and product type #27 )
// * [ ]   A user can also add a new customer or  product type from the add order page (see add form for customer #38 and product type #26 )
// * [ ]   The user has the option to "save and add another" product-- which performs a put then routes to a new product add form, "save and continue editing", or "save"-- which routes back to product list
