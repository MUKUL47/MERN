import React, { useState } from 'react';
import {CreatePost} from './components'
function Create(props){
    console.log(props)
    const [fields, updateFields] = useState({
        title : "",
        content : "",
        status : [true, false,false],
        keywords : new Set(),
        inactiveKeyword : ""
    })
    let post = (e)=>{          
        e.preventDefault()
        fetch(`/${props.id}/post`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },    
            body: JSON.stringify({
                title : fields.title,                
                content : fields.content,
                id : props.id,
                keywords : Array.from(fields.keywords),
                status : ""
            })
            })
            .then(response => response.json())
            .then(data => { 
                console.log(props)
                props.properties.history.push("/")                
             })
    }
    let title = (e)=>{
        updateFields({
            title : e.target.value,
            content : fields.content,
            status : fields.status,
            keywords : fields.keywords,
            inactiveKeyword : fields.inactiveKeyword
        })
    }

    let content = (e)=>{
        updateFields({
            content : e.target.value,
            title : fields.title,
            status : fields.status,
            keywords : fields.keywords,
            inactiveKeyword : fields.inactiveKeyword
        })
    }

    let status = (pos)=>{
        let newStatuses = [false,false,false]
        newStatuses[pos] = true
        updateFields({
            content : fields.content,
            title : fields.title,
            status : newStatuses,
            keywords : fields.keywords,
            inactiveKeyword : fields.inactiveKeyword
        })                
    }

    let addKeywords = (keyword) =>{         
        let nK = fields.keywords        
        nK.add(keyword)               
        updateFields({
            content : fields.content,
            title : fields.title,
            status : fields.status,
            keywords : nK,
            inactiveKeyword : fields.inactiveKeyword
        })   
    }

    let removeKeyword = (postion) => {
        let nK = Array.from(fields.keywords)
        nK.splice(postion,1) 
        updateFields({
            content : fields.content,
            title : fields.title,
            status : fields.status,
            keywords : new Set(nK),
            inactiveKeyword : fields.inactiveKeyword
        })
    }

    let changeKeyword = (e) =>{
        updateFields({
            content : fields.content,
            title : fields.title,
            status : fields.status,
            keywords : fields.keywords,
            inactiveKeyword : e.target.value
        })        
    }


    return(
        <center>
            <CreatePost
            changeTitle = {title}
            changeContent = {content}
            post = {post}
            title = {fields.title}
            content = {fields.content}
            status = {fields.status}
            changeStatus = {status}
            keywords = {Array.from(fields.keywords)}
            addKeywords = {addKeywords}
            changeKeyword = {changeKeyword}
            currentKeyword = {fields.inactiveKeyword}
            removeKeyword = {removeKeyword}
            />                                                 
        </center>
        )
}
export {Create}