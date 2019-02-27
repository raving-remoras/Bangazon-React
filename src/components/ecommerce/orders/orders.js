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
import OrderForm from "./order_form/order_form"

class Orders extends Component {
  state = {
    add: false,
    completedSwitch: false,
    incompleteSwitch: false,
    productSwitch: false,
    customerSwitch: false
  }

  componentDidMount = () => {
    this.refreshData()
  }

  refreshData = () => {
    APICalls.getAllFromCategoryWithQuery("orders", ["_include"], ["products", "customers"])
      .then(orders => this.setState({ orders }))
  }

  handleChange = (evt) => {
    this.setState({ [evt.target.id]: !this.state[evt.target.id]  })
  }

  // toggleAdd = () => {
  //   this.setState({ add: !this.state.add })
  // }

  // toggleCompleted = () =>{
  //   this.setState({ completedSwitch: !this.state.completedSwitch  })
  // }

  orderList = (orders) => {
    return (
      <ListGroup className="listItems">
        <ListGroupItem color="info">
          <Row>
            <Col xs={4} className=" d-flex align-items-center text-center"><h6>Order Id</h6></Col>
            <Col xs={4} className=" d-flex align-items-center text-center"><h6>Customer Name</h6></Col>
            <Col xs={4} className=" d-flex align-items-center text-center"><h6>Payment Type</h6></Col>
          </Row>
        </ListGroupItem>
        {
          orders
            ? orders.map(order => {
              return(
                <ListGroupItem tag="a" href={`orders/${order.id}`} key={order.url} action>
                  <Row>
                    <Col xs={4} className=" d-flex align-items-center text-center">{order.id}</Col>
                    <Col xs={4} className=" d-flex align-items-center text-center">{order.customer}</Col>
                    <Col xs={4} className=" d-flex align-items-center text-center">{order.payment_type}</Col>
                  </Row>
                </ListGroupItem>
              )
            })
            : <ListGroupItem>No orders currently available</ListGroupItem>
        }
      </ListGroup>
    )
  }

  render() {
    return (
      <>
        <Container className="text-center">
          <h1>Orders</h1>
        </Container>
        <Container className="text-center addButton">
          {
            (this.state.add === false)
              ?
              <Button color="primary" className="ml-2" onClick={()=>this.toggleAdd()}>Add Order</Button>
              :
              <Button color="danger" className="ml-2" onClick={()=>this.toggleAdd()}>Cancel</Button>
          }
        </Container>
        {
          (this.state.add === true)
            ? <OrderForm
              toggle={this.toggleAdd}
              refresh={this.refreshData}
            />
            : null
        }
        {this.orderList(this.state.orders)}
      </>
    )
  }
}

export default Orders

// A user has an affordance to view all orders (order id, cust name, payment type)
// A user has an affordance to filter out completed or incomplete orders (endpoints ?completed=false or ?completed=true)
// A user has an affordance to embed products in an order in the order list view ( endpoint ?_include=products)
// A User has an affordance to embed the associate customer in the order list view(endpoint ?_include=customers)