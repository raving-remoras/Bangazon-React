import React, { Component } from "react"
import APICalls from "../../../../modules/APICalls"
import {
  Container,
  Button,
  Row,
  Col,
  ListGroup,
  ListGroupItem
} from "reactstrap"
import OrderForm from "../order_form/order_form"
import PropTypes from "prop-types"

class OrderDetail extends Component {
  state = {
    isLoaded: false,
    edit: false
  }

  componentDidMount = () =>{
    this.refreshData()
  }

  refreshData = ()=>{
    let customer_url = ""
    APICalls.getOneFromCategory("orders", this.props.match.params.orderId)
      .then(order => {
        if (order.payment_type){
          this.setState({order})
          customer_url = order.customer
          return APICalls.getOneFromCategoryURL(order.payment_type)
            .then(payment_type => {
              this.setState({ payment_type })
              return APICalls.getOneFromCategoryURL(customer_url)
            })
            .then(customer => this.setState({ customer, isLoaded: true }))
        }
        else{
          this.setState({ order })
          return APICalls.getOneFromCategoryURL(order.customer)
            .then(customer => this.setState({ customer, isLoaded: true }))
        }
      })
  }

  toggleEdit = () => {
    this.setState({ edit: !this.state.edit })
  }

  productList = (products) => {
    return (
      <Col className="mt-3">
        <h6 className="text-black-50">Products</h6>
        <ListGroup className="mt-2 mb-1">
          {
            (products.length)
              ? products.map(product => {
                return(
                  <ListGroupItem tag="a" href={`../../ecommerce/products/${product.product.id}`} key={product.product.url} action>
                    {product.product.title}
                  </ListGroupItem>
                )
              })
              : <ListGroupItem>This order has no products</ListGroupItem>
          }
        </ListGroup>
      </Col>
    )
  }

  orderDetail =(order, payment_type, customer)=>{
    return(
      order
        ?
        <>
        <ListGroup className="detailView">
          <ListGroupItem>
            <Row>
              <Col>Order:</Col>
              <Col>{order.id}</Col>
            </Row>

            {
              payment_type
                ?<Row>
                  <Col>Payment Type:</Col>
                  <Col>{payment_type.name}</Col>
                </Row>
                : <Row>
                  <Col>Payment Type:</Col>
                  <Col>No Payment Types for this Customer</Col>
                </Row>
            }
            {
              (order.payment_date !== null)
                ?<Row>
                  <Col>Payment Date:</Col>
                  <Col>{order.payment_date}</Col>
                </Row>
                :<Row>
                  <Col>Payment Date:</Col>
                  <Col>No Payment Date for this Order</Col>
                </Row>
            }
            {
              customer
                ?<Row>
                  <Col>Customer Name:</Col>
                  <Col>{customer.first_name} {customer.last_name}</Col>
                </Row>
                : null
            }
            {this.productList(order.products)}
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
        (this.state.order)
          ?<Container className="text-center">
            <h1>Order: #{this.state.order.id}</h1>
          </Container>
          : null
      }
      <Container className="text-center editButton">
        {
          (this.state.edit === false)
            ?<Button color="primary" onClick={()=> this.toggleEdit()}>Edit Order</Button>
            :<Button color="danger" onClick={()=> this.toggleEdit()}>Cancel</Button>
        }
      </Container>
      {
        (this.state.edit === true)
          ?<OrderForm
            order={this.state.order}
            payment_type={this.state.payment_type}
            customer={this.state.customer}
            toggle={this.toggleEdit}
            refresh={this.refreshData}
          />
          :null
      }
      {
        (this.state.isLoaded === true)
          ? this.orderDetail(this.state.order, this.state.payment_type, this.state.customer)
          : null
      }
      </>
    )
  }
}

export default OrderDetail

OrderDetail.propTypes = {
  match: PropTypes.object
}