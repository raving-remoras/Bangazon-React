import React, { Component } from "react"
import {Container, Button, Row, Col, ListGroup, ListGroupItem} from "reactstrap"
import APICalls from "../../../../modules/APICalls"
import PropTypes from "prop-types"

class ProductDetail extends Component {
  state = {  }

  componentDidMount=()=>{
    this.refreshData()
  }

  refreshData = () =>{
    APICalls.getOneFromCategoryWithQuery("products", this.props.match.params.productId, "include", "seller")
      .then(product_detail => {
        this.setState({ product_detail })
        return APICalls.getOneFromCategoryURL(product_detail.product_type)
      })
      .then(product_type => {this.setState({"product_type":product_type})})
  }

  // TODO: Link button to product form and pass in product details, have it render in place

  productDetail = (product, product_type) => {
    return(
      product
        ? <>
        <Row>
          <Col className="mb-5">
            <h1>{product.title}</h1>
          </Col>
          <Col md="3" className="ml-auto align-right">
            <Button tag="a" href={"/ecommerce/products/edit"}>Edit Product Details</Button>
          </Col>
        </Row>
        <ListGroup>
          <ListGroupItem>
            {
              product_type
                ?<Row>
                  <Col>Product Type:</Col>
                  <Col>{product_type.name}</Col>
                </Row>
                : null
            }
            <Row>
              <Col>Description:</Col>
              <Col>{product.description}</Col>
            </Row>
            <Row>
              <Col>Price:</Col>
              <Col>{product.price}</Col>
            </Row>
            <Row>
              <Col>Quantity:</Col>
              <Col>{product.quantity}</Col>
            </Row>
            <Row>
              <Col>Seller:</Col>
              <Col>{product.seller.first_name} {product.seller.last_name}</Col>
            </Row>
          </ListGroupItem>
        </ListGroup>
        </>
        : null
    )
  }



  render() {
    return (
      <Container>
        {this.productDetail(this.state.product_detail, this.state.product_type)}
      </Container>

    )
  }
}

export default ProductDetail

ProductDetail.propTypes = {
  products: PropTypes.object.isRequired
}