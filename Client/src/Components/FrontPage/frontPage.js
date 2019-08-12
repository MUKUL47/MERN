import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {Navbar} from '../navbar/navbar'
import {Posts} from './childrenComponents/posts/posts'
import {Create} from '../createPost/childrenComponents/createPost'

class FrontPage extends Component {
    constructor(props){
        super(props)  
        console.log(props)  
        this.state = { 
          username : "",
          id : "",
          sessionValidity : 0
        }
    }

    redirectLogin(msg){
      this.props.history.push({
        pathname:"/",
          state: { msg : msg }
      })
    }

    componentWillMount(){  
      fetch("/getLastLogged")
        .then(msg => msg.json())
        .then(m => {          
          let user = JSON.parse(m.user)
            if( !user.user || user.till != Infinity && 
              Math.abs(Math.floor(user.till - Date.now())/1000) > 3600 ){  
                this.redirectLogin()                
            }else{
              this.setState({
                username : user.user.substring(0,user.user.indexOf('@')),
                id : user.id,
                sessionValidity : user.till
              })
            }
        })
        .catch (e => this.props.history.push({
          pathname:"/loginOrRegister",
            state: { msg : "Some error has occured please try again some time" }
        })
          )
    }
    render(){
      let dynamicdiv = [
      <Posts
      id = {this.state.id}
      />,
      <Create
        id = {this.state.id}
        properties = {this.props}
        />],
        cDiv;

      switch(this.props.history.location.pathname){
        case '/' : 
        cDiv = dynamicdiv[0]      
          break
        case '/create' :
            cDiv = dynamicdiv[1]  
          break
      }
      console.log(dynamicdiv)
      return ( 
        <Router>          
        <div>         
        <Navbar
          username = {this.state.username}
          properties = {this.props}
          />
          {cDiv}
        </div>                
        </Router>
        )
}}

export {FrontPage}