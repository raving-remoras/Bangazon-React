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
      <ListGroup className="listItems">
        <ListGroupItem color="info">
          <Row>
            <Col xs={4} className=" d-flex align-items-center text-center"><h6>Title</h6></Col>
            <Col xs={4} className=" d-flex align-items-center text-center"><h6>Price</h6></Col>
            <Col xs={4} className=" d-flex align-items-center text-center"><h6>Quantity</h6></Col>
          </Row>
        </ListGroupItem>
        {
          products
            ? products.map(product => {
              return(
                <ListGroupItem tag="a" href={`products/${product.id}`} key={product.url} action>
                  <Row>
                    <Col xs={4} className=" d-flex align-items-center text-center">{product.title}</Col>
                    <Col xs={4} className=" d-flex align-items-center text-center">${product.price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}</Col>
                    <Col xs={4} className=" d-flex align-items-center text-center">{product.quantity}</Col>
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
      <>
        <Container className="text-center">
          <h1>Products</h1>
        </Container>
        <Container className="text-center addButton">
          {
            (this.state.add === false)
              ?
              <Button color="primary" className="ml-2" onClick={()=>this.toggleAdd()}>Add Product</Button>
              :
              <Button color="danger" className="ml-2" onClick={()=>this.toggleAdd()}>Cancel</Button>
          }
        </Container>
        {
          (this.state.add === true)
            ? <ProductForm
              toggle={this.toggleAdd}
              refresh={this.refreshData}
            />
            : null
        }
        {this.productList(this.state.products)}

      </>
    )
  }
}

export default Products
