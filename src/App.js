import React, { Component } from "react"
import NavBar from "./NavBar.js"
import AppRouter from "./AppRouter.js"

import { Container } from "reactstrap"

class App extends Component {
  render() {
    return (
      <>
        <NavBar />
        <Container>
          <AppRouter />
        </Container>
      </>
    )
  }
}

export default App
