import React, { Component } from "react"
import {
  Container,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Button
} from "reactstrap"
import APICalls from "../../../modules/APICalls"
import ProductTypeForm from "./product_type_form/product_type_form"

class ProductTypes extends Component {
  state = {
    add: false,
  }

  componentDidMount = ()=>{
    this.refreshData()
  }

  refreshData = () => {
    APICalls.getAllFromCategory("producttypes").then(data => this.setState({ "productTypes": data }))
  }

  toggleAdd = () => {
    this.setState({add: !this.state.add})
  }

  productTypeList = (productTypes) => {
    return(
      <ListGroup>
        <ListGroupItem color="info">
          <Row>
            <Col><h6>Name</h6></Col>
          </Row>
        </ListGroupItem>
        {
          productTypes
            ? productTypes.map(productType =>{
              return(
                <ListGroupItem tag="a" href={`producttypes/${productType.id}`} key={productType.url} action>
                  <Row>
                    <Col>{productType.name}</Col>
                  </Row>
                </ListGroupItem>
              )})
            : <ListGroupItem>No product types currently available</ListGroupItem>
        }
      </ListGroup>
    )
  }


  render() {
    return (
      <Container>
        <Row>
          <Col className="mb-5">
            <h1>Product Types</h1>
          </Col>
          {
            (this.state.add === true)
              ? <ProductTypeForm
                toggle={this.toggleAdd}
                refresh={this.refreshData}
              />
              : null
          }
          {
            (this.state.add === false)
              ? <Col md="3" className="ml-auto align-right"><Button color="primary" className="ml-2" onClick={() => this.toggleAdd()}>Add Product Type</Button></Col>
              : <Col md="3" className="ml-auto align-right"><Button color="danger" class="ml-2" onClick={() => this.toggleAdd()}>Cancel</Button></Col>
          }
        </Row>
        {this.productTypeList(this.state.productTypes)}
      </Container>
    )
  }
}

export default ProductTypes