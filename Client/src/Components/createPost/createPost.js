import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {Navbar} from '../navbar/navbar'
import {Create} from './childrenComponents/createPost'
import {checkUserSession} from '../async/checkValidUser'
import Cookies from 'js-cookie';

class CreatePost extends Component {
    constructor(props){
        super(props);  
        this.state = { 
          username : Cookies.get("user"),
          sessionValidity : Cookies.get("till"),
          id : (Cookies.get("id") ? Cookies.get("id").substring(1) : "")
        }
    }

    componentWillMount(){   
      if( !this.state.username || this.state.sessionValidity != Infinity && 
        Math.abs(Math.floor(Date.now() - this.state.sessionValidity)/1000) > 3600 ){
          this.props.history.push({pathname:"/loginOrRegister",
          state: { msg : "Login first" }
        })                          
      }
    }

    render(){
      return ( 
        <Router>          
        <div>
          <Navbar
          username = {this.state.username}
          properties = {this.props}
          />
          <Create
            id = {this.state.id}
            properties = {this.props}
        /> 
        </div>                
        </Router>
        )
}}

export {CreatePost}