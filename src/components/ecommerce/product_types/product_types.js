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
    APICalls.getAllFromCategory("producttypes").then(productTypes => this.setState({ productTypes }))
  }

  toggleAdd = () => {
    this.setState({add: !this.state.add})
  }

  productTypeList = (productTypes) => {
    return(
      <ListGroup className="listItems">
        <ListGroupItem color="info">
          <Row>
            <Col xs={4} className=" d-flex align-items-center text-center"><h6>Name</h6></Col>
          </Row>
        </ListGroupItem>
        {
          productTypes
            ? productTypes.map(productType =>{
              return(
                <ListGroupItem tag="a" href={`producttypes/${productType.id}`} key={productType.url} action>
                  <Row>
                    <Col className=" d-flex align-items-center text-center">{productType.name}</Col>
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
      <>
        <Container className="text-center">
          <h1>Product Types</h1>
        </Container>
        <Container className="text-center addButton">
          {
            (this.state.add === false)
              ? <Button color="primary" className="ml-2" onClick={() => this.toggleAdd()}>Add Product Type</Button>
              : <Button color="danger" class="ml-2" onClick={() => this.toggleAdd()}>Cancel</Button>
          }
        </Container>
        {
          (this.state.add === true)
            ? <ProductTypeForm
              toggle={this.toggleAdd}
              refresh={this.refreshData}
            />
            : null
        }
        {this.productTypeList(this.state.productTypes)}
      </>
    )
  }
}

export default ProductTypes