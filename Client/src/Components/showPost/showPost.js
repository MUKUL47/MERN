import React, { Component } from 'react';
import {FrontPage} from '../FrontPage/frontPage'
class ShowPost extends Component {
    constructor(props){
        super(props)
        this.state = {
            post : "Not Found",
            url : props.match.url
        }
    }
    componentWillMount(){
        fetch(this.state.url)
        .then(msg => msg.json())
        .then(m => {
            if( m != {} ){
                this.setState({
                    post : JSON.stringify(m)
                })
            }
        })
    }
    
    
    render(){
        return (
        <div>
            <h1>{this.state.post}</h1>
        </div>
            ) 
    }
}
export {ShowPost}