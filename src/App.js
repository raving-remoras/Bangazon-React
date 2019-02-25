import React, { Component } from 'react';
import NavBar from './NavBar.js'
import AppRouter from './AppRouter.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar/>
        <AppRouter />

      </div>
    );
  }
}

export default App;
