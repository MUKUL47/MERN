import React, { Component } from 'react';
import {FrontPage} from '../FrontPage/frontPage'
import {Navbar} from '../navbar/navbar'
import Cookies from 'js-cookie';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {ComponentController} from './components/componentController'


class ShowPost extends Component {
    constructor(props){
        super(props)
        console.log(this.props)
        this.state = {
            post : "",
            url : props.match.url,
            username : Cookies.get("user"),
            sessionValidity : Cookies.get("till"),
            id : (Cookies.get("id") ? Cookies.get("id").substring(1) : "")
        }
    }
    componentWillMount(){
        if( !this.state.username || 
            this.state.sessionValidity != Infinity && 
            Math.abs
            (Math.floor
            (Date.now() - this.state.sessionValidity)
            /1000) > 3600 ){
              this.props.history.push({pathname:"/loginOrRegister",
              state: { msg : "Login first" }
            })                          
          }else{
            fetch(this.state.url)
            .then(msg => msg.json())
            .then(m => {
                if( m ){
                    this.setState({
                        post : JSON.stringify(m.post[0])
                    })
                }
            })
          }
        
    }
    
    
    render(){
        let sP;        
        if(this.state.post != ""){
            console.log(this.state)
            sP = < ComponentController 
            post = {this.state.post}
            id = {this.state.id}            
            />
        }

        return (
       <Router>
            <Navbar
            username = {this.state.username}
            properties = {this.props}          
            />
            {sP}
       </Router>
            ) 
    }
}
export {ShowPost}