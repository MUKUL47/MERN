import React, { useState } from 'react';
import style from '../../FrontPage/childrenComponents/style'
function Status(props){
    return(        
        <div >               
            <input type="checkbox" className="frequency" 
            checked = {(props.status == 0 ? true : false)}
            onChange = {() => props.changeStatus(0)}            
            />

            <b><h2><label>Private (visible to you and your friends)</label></h2></b>
            <br/>

            <input type="checkbox" className="frequency" 
            checked = {(props.status == 1 ? true : false)}        
            onChange = {() => props.changeStatus(1)}
            />

            <b><h2><label>Only Me (visible to you)</label></h2></b>
            <br/>
            
            <input type="checkbox" className="frequency" 
            checked = {(props.status == 2 ? true : false)}
            onChange = {() => props.changeStatus(2) }
            />
            <b><h2><label>Public (visible to everyone)</label></h2></b>        
        </div> 
    )
}

function AddKeyWords(props){
    let btn;
    if( props.currentKeyword.trim().length > 0 ) {
        btn = <button className = "ui black label"
        onClick = {() => props.addKeywords(props.currentKeyword.toLowerCase())} 
        >ADD</button>
    }
    return(
        <div>
        <div style = {style.keywords}>
        <div className = "ui input" >
            <input type="text" 
            placeholder="Keywords"
            onChange = {props.changeKeyword}
            value = {props.currentKeyword}          
            />
            {btn}
        </div>                          
        </div>
            {props.keywords.map( (v,i) =>
            <button className = "ui black label"
            onClick = {() => props.removeKeyword(i)}
            key = {Math.random()}
            >
            <h3>#{v}</h3>
            </button>
        )}
        </div>
    )
}

function CreatePost(props){
    return(                    
        <div style = {style.create}><br/>
                    <AddKeyWords
                    keywords = {props.keywords}
                    addKeywords = {props.addKeywords}
                    changeKeyword = {props.changeKeyword}
                    currentKeyword = {props.currentKeyword}
                    removeKeyword = {props.removeKeyword}
                    />  
        <form className="ui form"> 
            <h2 style = {style.headings}>Enter title</h2>
                    <div className = "ui input">
                    <input type="text" placeholder="Title" 
                    onChange = {props.changeTitle}
                    value = {props.title}
                    />
                    </div>
                    <br/>                                    
                    <h2 style = {style.headings}>Enter content</h2>
                    <div className = "ui massive icon input">        
                    <input type="text" placeholder="Enter post" 
                    onChange = {props.changeContent}
                    value = {props.content}
                    />                  
                    </div>     
                    <br/><br/> 
                    <Status
                    status = {props.status}                    
                    changeStatus = {props.changeStatus}
                    />                         
                    <br/><br/> 
                    <button className="ui black label" style = {style.post} 
                    onClick = {props.post}
                    disabled = {!(props.title.trim().length > 0 && props.content.trim().length > 0)}
                    >{!(props.title.trim().length > 0 && 
                    props.content.trim().length > 0) ? <h2>Enter title and content to proceed</h2> : <h1>Create post</h1>}</button>   
                    
                    <br/><br/> 
            </form>   
        </div> 
    )
}

export {CreatePost}