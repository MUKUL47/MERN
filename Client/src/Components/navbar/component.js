import React, { useEffect, useState } from 'react';
import style from '../FrontPage/childrenComponents/style'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function NavComponent(props){
    return(
        <Router>
        <div className="ui fixed inverted menu" style = {style.navbar}>              
           <a className="item" 
           onClick = {props.getHome}>
              {props.username}
           </a>
           <a className="item" 
          >
              Profile
           </a>
           <a className="item" 
           onClick = {props.getCreate}>
              Create
           </a>
           <a className="item"
           >
              Friends
           </a>
           <a className="item" 
           >
              Requests
           </a>  
            <a className="item" onClick = {props.logout}>
                Logout
            </a>
            <div style={style.search}>
            <div className="ui category search">
                <div className="ui icon input">
                <input className="prompt" type="text" placeholder="Search..."/>
                <i className="search icon"></i>
                </div>
            <div className="results"></div>
        </div>  
        </div>                  
        </div>
        </Router>       
    )    
}

export default NavComponent