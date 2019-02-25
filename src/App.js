import React, { Component } from "react"
import NavBar from "./NavBar.js"
import AppRouter from "./AppRouter.js"

class App extends Component {
  render() {
    return (
      <>
        <NavBar />
        <AppRouter />
      </>
    )
  }
}

export default App
