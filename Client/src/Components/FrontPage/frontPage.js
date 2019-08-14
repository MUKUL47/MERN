import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {Navbar} from '../navbar/navbar'
import {Posts} from './childrenComponents/posts/posts'
import {Create} from '../createPost/childrenComponents/createPost'
import Cookies from 'js-cookie';

class FrontPage extends Component {
    constructor(props){
        super(props)  
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
      let postDiv;
      if(this.state.id){
        postDiv = <Posts
          id = {this.state.id}
          properties = {this.props}
          username = {this.state.username}
          />
      }
      return ( 
        <Router>          
        <div>         
        <Navbar
          username = {this.state.username}
          properties = {this.props}
          />
          {postDiv}
          </div>
        </Router>
        )
}}

export {FrontPage}