import React, { Component } from 'react';
import NavComponent from './component'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
class Navbar extends Component{
   constructor(props){
      super(props)
   }
   getHome(){
      this.props.properties.history.push(`/`)
   }

   getCreate(){
      this.props.properties.history.push(`/create`)
   }  

   logout(){
      fetch("/logout")
      .then(msg => msg.json())
      .then(m => this.props.properties.history.push({pathname:"/loginOrRegister",
        state: { msg : m.Success }
      }))                             
   } 
   render(){
      return(
         <Router>
            <NavComponent
            logout = {this.logout.bind(this)}            
            getCreate = {this.getCreate.bind(this)}            
            getHome = {this.getHome.bind(this)}  
            username = {this.props.username}          
            />
         </Router>
      )
   }
}
export {Navbar}