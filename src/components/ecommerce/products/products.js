import React, { Component } from "react"
import { Container, ListGroup, ListGroupItem, Button, Row, Col } from "reactstrap"
import PropTypes from "prop-types"
// import APICalls from "../../../modules/APICalls"

class Products extends Component {
  state = {  }

  // componentDidMount = () => {
  //   this.refreshData()
  // }

  // refreshData = () => {
  //   APICalls.getAllFromCategory("products").then(data => this.setState({ "products": data }))
  // }

  // TODO: Update price formatting

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
                    <Col>{product.price}</Col>
                    <Col>{product.quantity}</Col>
                  </Row>
                </ListGroupItem>
              )})
            : <ListGroupItem>No products currently available </ListGroupItem>
        }
      </ListGroup>
    )
  }

  // TODO: Link button to product form and have it render a new page

  render() {
    return (
      <Container>
        <Row>
          <Col className="mb-5">
            <h1>Products</h1>
          </Col>
          <Col md="3" className="ml-auto align-right">
            <Button className="ml-2">Add New Product</Button>
          </Col>
        </Row>
        {this.productList(this.props.products)}
      </Container>
    )
  }
}

export default Products


Products.propTypes = {
  products: PropTypes.array.isRequired
}