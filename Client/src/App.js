import React, { Component } from 'react';
import './App.css';
import {LoginRegister} from './Components/Home/home'
import {FrontPage} from './Components/FrontPage/frontPage'
import {VerifyAccount} from './Components/Home/hiddenComponent'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends Component {
  state = {}
  render() {
    return (
    <Router>
     <Route exact path="/" component={LoginRegister} /> 
     <Route exact path="/home" component={FrontPage} /> 
     <Route exact path="/register" component={LoginRegister} /> 
    </Router>
    );
  }
}

export default App;