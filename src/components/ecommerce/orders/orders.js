import React, { Component } from "react"
import {
  Container,
  ListGroup,
  ListGroupItem,
  Button,
  Row,
  Col,
  CustomInput,
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
    APICalls.getAllFromCategoryWithQuery("orders", ["_include"], ["products,customers"])
      .then(orders => this.setState({ orders }))
  }

  handleChange = (evt) => {
    if (evt.target.id === "completedSwitch"){
      if(this.state.completedSwitch === false){
        let completed_orders = this.state.orders.filter(order => order.payment_type !== null)
        this.setState({ "orders": completed_orders, [evt.target.id]: !this.state[evt.target.id]  })
      } else{
        this.refreshData()
        this.setState({ [evt.target.id]: !this.state[evt.target.id] })
      }
    } else if (evt.target.id === "incompleteSwitch"){
      if(this.state.incompleteSwitch === false){
        let incomplete_orders = this.state.orders.filter(order => order.payment_type === null)
        this.setState({ "orders": incomplete_orders, [evt.target.id]: !this.state[evt.target.id]  })
      } else{
        this.refreshData()
        this.setState({ [evt.target.id]: !this.state[evt.target.id]  })
      }
    }

    else{
      this.setState({ [evt.target.id]: !this.state[evt.target.id]  })
    }
  }

  toggleAdd = () => {
    this.setState({ add: !this.state.add })
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
                  <ListGroupItem key={product.product.url}>
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

  customerList = (customer) => {
    return (
      <Col className="mt-3">
        <h6 className="text-black-50">Customers</h6>
        <ListGroup className="mt-2 mb-1">
          {
            customer
              ? <ListGroupItem key={customer.url}>
                {customer.first_name} {customer.last_name}
              </ListGroupItem>
              : <ListGroupItem>This order has no customers</ListGroupItem>
          }
        </ListGroup>
      </Col>

    )
  }

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
                    <Col xs={4} className=" d-flex align-items-center text-center">{order.customer.first_name} {order.customer.last_name}</Col>
                    <Col xs={4} className=" d-flex align-items-center text-center">{order.payment_type}</Col>
                  </Row>
                  {
                    this.state.productSwitch
                      ? this.productList(order.products)
                      : null
                  }
                  {
                    this.state.customerSwitch
                      ? this.customerList(order.customer)
                      : null
                  }
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
        {
          (this.state.add === true)
            ? <OrderForm
              toggle={this.toggleAdd}
              refresh={this.refreshData}
            />
            : null
        }
        <Row>
          <Col className="d-lg-flex">
            <div className="mr-4">
              <CustomInput onChange={this.handleChange} type="switch" id="completedSwitch" name="customSwitch" label="Completed Orders" className="mb-3" checked={this.state.completedSwitch} />
            </div>
            <div className="mr-4">
              <CustomInput onChange={this.handleChange} type="switch" id="incompleteSwitch" name="customSwitch" label="Incomplete Orders" className="mb-3" checked={this.state.incompleteSwitch} />
            </div>
            <div className="mr-4">
              <CustomInput onChange={this.handleChange} type="switch" id="productSwitch" name="customSwitch" label="Include Products" className="mb-3" checked={this.state.productSwitch} />
            </div>
            <div className="mr-4">
              <CustomInput onChange={this.handleChange} type="switch" id="customerSwitch" name="customSwitch" label="Include Customers" className="mb-3" checked={this.state.customerSwitch} />
            </div>
            <div className="ml-auto">
              {
                (this.state.add === false)
                  ?
                  <Button color="primary" className="ml-2" onClick={()=>this.toggleAdd()}>Add Order</Button>
                  :
                  <Button color="danger" className="ml-2" onClick={()=>this.toggleAdd()}>Cancel</Button>
              }
            </div>
          </Col>
        </Row>

        {this.orderList(this.state.orders)}
      </>
    )
  }
}

export default Orders