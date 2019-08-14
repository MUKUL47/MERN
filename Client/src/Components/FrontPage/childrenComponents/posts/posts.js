import React, { Component } from 'react';
import style from '../style'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {Navbar} from '../../../navbar/navbar'
class Posts extends Component{
    constructor(props){
        super(props) 
        this.state = {
            posts : [],
            id : this.props.id,
            user : this.props.username
        }
    }

    componentWillMount(){       
        fetch(`/posts/${this.state.id}`)
            .then(response => response.json())
            .then(data => { 
                console.log(data.Success)
                this.setState({
                    posts : data.Success
                })                
             })
    }

    getPost(url){
        this.props.properties.history.push({ pathname : url, state : {username : this.state.user} })
    }

    render(){
        console.log(this.state)
        return(
            <Router>
            <div style = {style.navChild}>
                {this.state.posts.map((v,i) => 
                   <div className="item" key = {Math.random()}>
                       <button onClick = {() => this.getPost(`/post/${v._id}`)}>
                       {JSON.stringify(v)}  
                       </button>
                   </div>   
                   )}
            </div>    
        </Router>
            )
    }
}
export {Posts}