import React, { Component } from "react"
import {
  Container,
  Button,
  Row,
  Col,
  ListGroup,
  ListGroupItem
} from "reactstrap"
import APICalls from "../../../../modules/APICalls"
import PropTypes from "prop-types"
import ProductForm from "../product_form/product_form"

class ProductDetail extends Component {
  state = {
    isLoaded: false,
    edit: false
  }

  componentDidMount=()=>{
    this.refreshData()
  }

  refreshData = () =>{
    APICalls.getOneFromCategoryWithQuery("products", this.props.match.params.productId, "include", "seller")
      .then(product_detail => {
        this.setState({ product_detail })
        return APICalls.getOneFromCategoryURL(product_detail.product_type)
      })
      .then(product_type => {this.setState({product_type, isLoaded: true })})
  }

  toggleEdit = () => {
    this.setState({ edit: !this.state.edit })
  }

  productDetail = (product, product_type) => {
    return(
      product
        ?
        <>
        <ListGroup className="detailView">
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
              <Col>${product.price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}</Col>
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
      <>
        {
          (this.state.product_detail)
            ?<Container className="text-center">
              <h1>{this.state.product_detail.title}</h1>
            </Container>
            : null
        }
        <Container className="text-center editButton">
          {
            (this.state.edit === false )
              ?<Button color="primary" onClick={()=> this.toggleEdit()}>Edit Product</Button>
              :<Button color="danger" onClick={()=> this.toggleEdit()}>Cancel</Button>
          }
        </Container>
        {
          (this.state.edit === true)
            ? <ProductForm
              product={this.state.product_detail}
              product_type={this.state.product_type}
              toggle={this.toggleEdit}
              refresh={this.refreshData}
            />
            : null
        }
        {
          (this.state.isLoaded === true)
            ? this.productDetail(this.state.product_detail, this.state.product_type)
            : null
        }
    </>
    )
  }
}

export default ProductDetail

ProductDetail.propTypes = {
  match: PropTypes.object
}