import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import React, { Component } from 'react';
import {FrontPage} from './frontPage'
class HomeController extends Component {
    state = {}
    render() {
      return (
      <Router>
       <Route exact path="/home" component={FrontPage} />    
      </Router>
      );
    }
  }
  
export {HomeController};