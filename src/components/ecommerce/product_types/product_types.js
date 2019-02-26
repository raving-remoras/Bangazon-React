import React, { Component } from "react"
import {Container, ListGroup, ListGroupItem, Row, Col} from "reactstrap"
import APICalls from "../../../modules/APICalls"

class ProductTypes extends Component {
  state = {  }

  componentDidMount = ()=>{
    this.refreshData()
  }

  refreshData = () => {
    APICalls.getAllFromCategory("producttypes").then(data => this.setState({ "productTypes": data }))
  }

  productTypeList = (productTypes) => {
    return(
      <ListGroup>
        <ListGroupItem>
          <Row>
            <Col>Name</Col>
          </Row>
        </ListGroupItem>
        {
          productTypes
            ? productTypes.map(productType =>{
              return(
                <ListGroupItem key={productType.url}>
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
        <h1>Product Types</h1>
        {this.productTypeList(this.state.productTypes)}
      </Container>
    )
  }
}

export default ProductTypes