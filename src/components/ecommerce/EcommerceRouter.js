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
import Products from "./products/products"
import ProductTypes from "./product_types/product_types"
import ProductDetail from "./products/product_detail/product_detail"
import APICalls from "../../modules/APICalls"

class EcommerceRouter extends Component {
  state = {  }

  componentDidMount = ()=>{
    APICalls.getAllFromCategory("products").then(data => this.setState({ "products" : data }))
  }

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
          </Nav>
        </Navbar>

        {/* Sub Router for all ecommerce paths */}
        <Switch>
          <Route exact path="/ecommerce/customers" render={(props) => <Customers {...props} />} />
          <Route exact path="/ecommerce/products" render={(props)=> <Products {...props} products={this.state.products}/>}/>
          <Route exact path="/ecommerce/products/:productId(\d+)" render={(props)=> <ProductDetail {...props}/>}/>
          <Route exact path="/ecommerce/producttypes" render={(props) => <ProductTypes {...props}/>}/>
        </Switch>
      </>
    )
  }
}

export default EcommerceRouter