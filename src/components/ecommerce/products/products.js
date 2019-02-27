import React, { Component } from "react"
import {
  Container,
  ListGroup,
  ListGroupItem,
  Button,
  Row,
  Col
} from "reactstrap"
import APICalls from "../../../modules/APICalls"
import ProductForm from "./product_form/product_form"

class Products extends Component {
  state = {
    add: false,
  }

  componentDidMount = () => {
    this.refreshData()
  }

  refreshData = () => {
    APICalls.getAllFromCategory("products").then(products => this.setState({ products }))
  }

  toggleAdd = () => {
    this.setState({ add: !this.state.add })
  }

  productList = (products) => {
    return (
      <ListGroup>
        <ListGroupItem color="info">
          <Row>
            <Col><h6>Title</h6></Col>
            <Col><h6>Price</h6></Col>
            <Col><h6>Quantity</h6></Col>
          </Row>
        </ListGroupItem>
        {
          products
            ? products.map(product => {
              return(
                <ListGroupItem tag="a" href={`products/${product.id}`} key={product.url} action>
                  <Row>
                    <Col>{product.title}</Col>
                    <Col>${product.price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}</Col>
                    <Col>{product.quantity}</Col>
                  </Row>
                </ListGroupItem>
              )})
            : <ListGroupItem>No products currently available </ListGroupItem>
        }
      </ListGroup>
    )
  }

  render() {
    return (
      <Container>
        <Row>
          <Col className="mb-5">
            <h1>Products</h1>
          </Col>
          {
            (this.state.add === true)
              ? <ProductForm
                toggle={this.toggleAdd}
                refresh={this.refreshData}
              />
              : null
          }
          {
            (this.state.add === false)
              ? <Col md="3" className="ml-auto align-right">
                <Button color="primary" className="ml-2" onClick={()=>this.toggleAdd()}>Add Product</Button></Col>
              : <Col md="3" className="ml-auto align-right">
                <Button color="danger" className="ml-2" onClick={()=>this.toggleAdd()}>Cancel</Button>
              </Col>
          }
        </Row>
        {this.productList(this.state.products)}
      </Container>
    )
  }
}

export default Products
