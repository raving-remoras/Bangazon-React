import React, { Component } from "react"
import { Switch, Route } from "react-router-dom"
import LandingPage from "./components/LandingPage/landingPage"
import HrRouter from "./components/hr/HrRouter"
import EcommerceRouter from "./components/ecommerce/EcommerceRouter"

class AppRouter extends Component {
  render() {
    return (
      <Switch>
        <Route path="/hr" render={(props) => <HrRouter {...props} />} />
        <Route path="/ecommerce" render={(props) => <EcommerceRouter {...props} />} />
        <Route exact path="/" render={(props) => <LandingPage {...props} />} />
      </Switch>
    )
  }
}

export default AppRouter
