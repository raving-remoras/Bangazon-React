import React, { Component } from "react"
import {
  Switch,
  Route,
  NavLink as RouterNavLink
} from "react-router-dom"
import {
  Nav,
  Navbar,
  NavItem,
  NavLink
} from "reactstrap"

import Customers from "./customers/customers"
import CustomerDetail from "./customers/customerDetail"
import NewCustomer from "./customers/newCustomer"
import Products from "./products/products"
import ProductTypes from "./product_types/product_types"
import ProductDetail from "./products/product_detail/product_detail"
import ProductTypeDetail from "./product_types/product_type_detail/product_type_detail"
import PaymentTypes from "./payment_types/paymentTypes"
import PaymentTypeDetail from "./payment_types/paymentTypeDetail"
import NewPaymentType from "./payment_types/newPaymentType"

class EcommerceRouter extends Component {
  state = {  }

  render() {
    return (
      <>
        <Navbar color="light" className="mb-4" expand="xs">
          <Nav navbar>
            <NavItem>
              <NavLink tag={RouterNavLink} to="/ecommerce/customers">Customers</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RouterNavLink} to="/ecommerce/products">Products</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RouterNavLink} to="/ecommerce/producttypes">Product Types</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RouterNavLink} to="/ecommerce/paymenttypes">Payment Types</NavLink>
            </NavItem>
          </Nav>
        </Navbar>

        {/* Sub Router for all ecommerce paths */}
        <Switch>
          <Route exact path="/ecommerce/customers" render={props => <Customers {...props} />} />
          <Route exact path="/ecommerce/customers/new" render={props => <NewCustomer {...props} />} />
          <Route path="/ecommerce/customers/:customerId(\d+)" render={props => <CustomerDetail {...props} />} />
          <Route exact path="/ecommerce/products" render={(props)=> <Products {...props} />}/>
          <Route exact path="/ecommerce/products/:productId(\d+)" render={(props)=> <ProductDetail {...props}/>}/>
          <Route exact path="/ecommerce/producttypes" render={(props) => <ProductTypes {...props}/>}/>
          <Route exact path="/ecommerce/producttypes/:productTypeId(\d+)" render={(props)=> <ProductTypeDetail {...props}/>}/>
          <Route exact path="/ecommerce/paymenttypes" render={props => <PaymentTypes {...props} />} />
          <Route exact path="/ecommerce/paymenttypes/:paymentTypeId(\d+)" render={props => <PaymentTypeDetail {...props} />} />
          <Route exact path="/ecommerce/paymenttypes/new" render={props => <NewPaymentType {...props} />} />
        </Switch>
      </>
    )
  }
}

export default EcommerceRouter