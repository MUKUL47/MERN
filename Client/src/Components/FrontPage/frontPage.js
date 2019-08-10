import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {Navbar} from './childrenComponents/navbar'
import {Create} from './childrenComponents/createPost'
import {Posts} from './childrenComponents/posts'
class FrontPage extends Component {
    constructor(props){
        super(props)        
        this.state = { 
          bars : ['','Profile','Create','Friends','Requests'],
          navcounter : -1,
          id : ""
        }
    }



    componentWillMount(){  
      fetch("/getLastLogged")
        .then(msg => msg.json())
        .then(m => {          
          let user = JSON.parse(m.user)
            if( !user.user || user.till != Infinity && Math.abs(Math.floor(user.till - Date.now())/1000) > 3600 ){  
                this.props.history.push({
                  pathname:"/",
                    state: { msg : "Login first" }
                })
            }else{
              console.log(user)
              this.setState({
                bars : [user.user.substring(0,user.user.indexOf('@')),
                'Profile','Create','Friends','Requests'],
                id : user.id,
                navcounter : 0
              })
              console.log(this.state)
            }
        })
        .catch (e => this.props.history.push({
          pathname:"/",
            state: { msg : "Some error has occured please try again some time" }
        })
          )
    }

    logout = ()=>{
      fetch("/logout")
      .then(msg => msg.json())
      .then(m => this.props.history.push({pathname:"/",
        state: { msg : m.Success }
      }))                             
    }

    setNavCounter = (c)=>{ this.setState({ navcounter : c })  }
    
    render(){
      let currentDiv;    
      switch(this.state.navcounter){
        case 0: currentDiv = <Posts
        id = {this.state.id}/>
          break;
        case 2: currentDiv = <Create
        id = {this.state.id}
        redirect = {this.setNavCounter}
        />
          break;
      }
      return ( 
        <Router>          
        <div>
          <Navbar 
          children = {this.state.bars}
          logout = {this.logout} 
          setCounter = {this.setNavCounter}                   
          />
          {currentDiv}
        </div>
        </Router>
        )
}}

export {FrontPage}