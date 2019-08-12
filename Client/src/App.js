import React, { Component } from 'react';
import './App.css';
import {LoginRegister} from './Components/Home/home'
import {FrontPage} from './Components/FrontPage/frontPage'
import {ShowPost} from './Components/showPost/showPost'
import {CreatePost} from './Components/createPost/createPost'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends Component {
  state = {}
  render() {
    return (
    <Router>
     <Route exact path="/loginOrRegister" component={LoginRegister} /> 
     <Route exact path="/" component={FrontPage} />
     <Route exact path="/create" component={FrontPage} />
     <Route exact path="/post/:id" component={ShowPost}/>  
    </Router>
    );
  }
}

export default App;