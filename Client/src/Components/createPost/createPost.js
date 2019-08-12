import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {Navbar} from '../navbar/navbar'
import {Create} from './childrenComponents/createPost'
import {checkUserSession} from '../async/checkValidUser'
class CreatePost extends Component {
    constructor(props){
        super(props);  
        this.state = { 
          username : "",
          id : "",
          sessionValidity : 0,
          c : this
        }
    }

    redirectLogin(msg){
      this.props.history.push({
        pathname:"/",
          state: { msg : msg }
      })
    }
    componentWillMount(){ 
      (async function(){
        try{
        let msg  = await fetch("/getLastLogged"),
            msg1 = await msg,
            fM   = await msg1.json(),
            user = JSON.parse(fM.user);
        if( !user.user || user.till != Infinity && 
            Math.abs(Math.floor(user.till - Date.now())/1000) > 3600 ){  
              this.redirectLogin("Login")                
        }else{
            this.setState({
            username : user.user.substring(0,user.user.indexOf('@')),
            id : user.id,
            sessionValidity : user.till
              })
          }
        }
        catch(e){
          this.redirectLogin("Some error has occured please try again some time")          
        }
      }())
    }

    render(){
      
      console.log(this.props.history.location.pathname)
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