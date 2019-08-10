import React, { Component } from 'react';
import style from './style'
function Navbar(props){
    return(
            <div className="ui fixed inverted menu" style = {style.navbar}>
               {props.children.map((v,i) => 
               <a className="item" key = {Math.random()} 
               onClick = {()=>{ props.setCounter(i) }}>
                  {v}
               </a>   
               )}
                <a className="item" key = {Math.random()} onClick = {props.logout}>
                    Logout
                </a>                    
            </div>       
        )
}
export {Navbar}