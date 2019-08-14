import React, { useState } from 'react';
import './style.css'
function TitleContentKeywords(prop){
    var props = prop.p
    let addKeywords = 
            <div className = "ui input" id="kW" >
            <input type="text" 
            placeholder="Add keywords"
            value = {props.currentKeyword} 
            onChange = {props.changeKeyword}            
            />
            {props.currentKeyword.trim().length > 0 ?
            <button class="ui secondary button"
            onClick = {props.addKeyword}
            >Add</button>
            : null}            
            </div>,
            
    keywords = 
            <div id= "delete">
                {props.keywords.map( v => 
                    <button className="ui inverted yellow button" 
                    key = {Math.random()}                    
                    onDoubleClickCapture =
                    {() => props.removeKeyword(v)}
                    >
                    {v}
                    </button>
                )}          
            </div>,

    title       = <h1 id = "title">{props.title}</h1>,

    content     = <h1 id = "content">{props.content}</h1>;

    return(
        <div>
            {title}
            <h2>created at : {props.at.substring(0,10)}</h2>           
            <div class="ui divider"></div>
            {keywords}            
            {addKeywords}
            {content}
        </div>
    )
}

function LikeDeleteStatus(prop){
    var props = prop.p;  

    let like =     
    <div id = "delete">
        <div className="ui labeled button">
        <div className="ui red button"
        onClick = { () => props.likePost() }
        >
            Like
        </div>
        <a className="ui basic red left pointing label">
            {props.likes.length}
        </a>
    </div>
    </div>,

    deletePost =  
    <button class="ui red button" 
    onDoubleClickCapture = { () => props.deletePost() }
    >Delete Post</button>,

    changeStatus = 
    <div id="status">
        <button class="massive ui button"
        onDoubleClickCapture = {() => props.changeStatus(0)}
        >
        {(props.status == 0 ? <u>Private</u> : "Private" )}
        </button>
        <button class="massive ui button" 
        onDoubleClickCapture = {() => props.changeStatus(1)}        
        >
        {(props.status == 1 ? <u>Only me</u> : "Only me" )}
        </button>        
        <button class="massive ui button" 
        onDoubleClickCapture = {() => props.changeStatus(2)}
        >
        {(props.status == 2 ? <u>Public</u> : "Public" )}
        </button>
    </div>

    return(
        <div>
        {like}
        {deletePost}
        <br/><br/>       
        {changeStatus}
        </div>
        )
   
}

function CommentSection(prop){    
    var props = prop.p
    let commentInput = 
    <div className="ui form">
        <textarea rows={2} columns={20} id="commentI"
         placeholder="What do you think about this post..."
         value = {props.currentComment}
         onChange = {props.changeComment}
         ></textarea>
         <br/>
        {
            props.currentComment.trim().length > 0 ?
            <button id="commentI" 
            class="ui secondary button"
            onClick = {() => props.commentPost()}
            >
            Comment
            </button>
            :
            null
        }
    </div>
    
    let comments = 
    <div>
        {props.comments.map( v => 
        <div>
        <h2 key = {Math.random()}>{v}</h2> 
        <div class="ui inverted divider"></div>
        </div>               
        )}
    </div>

    return (
        <div>
        {commentInput}
        {comments}
        </div>
    )
}

function Post(props){
    return(
    <div id="bg">
        <center> 
        <TitleContentKeywords p = {props}/> 
        <div class="ui inverted divider"></div>
        <br/>
        <LikeDeleteStatus p = {props}/> 
        <br/>            
        <div class="ui divider"></div>    
        <CommentSection p = {props}/>
        <br/><br/>        
        </center>        
    </div>

    )
}

export {Post}