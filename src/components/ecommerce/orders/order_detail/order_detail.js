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

    // .then(order => {
    //   this.setState({ order})
    //   customer_url = order.customer
    //   return APICalls.getOneFromCategoryURL(order.payment_type)
    // })
    // .then(payment_type => {
    //   this.setState({ payment_type })
    //   return APICalls.getOneFromCategoryURL(customer_url)
    // })
    // .then(customer => this.setState({ customer, isLoaded: true  }))
  }

  toggleEdit = () => {
    this.setState({ edit: !this.state.edit })
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
              customer
                ?<Row>
                  <Col>Customer Name:</Col>
                  <Col>{customer.first_name} {customer.last_name}</Col>
                </Row>
                : null
            }
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