import React, { useState } from 'react';
import style from './style'
function Create(props){
    const [fields, updateFields] = useState({
        title : "",
        content : "",
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
                id : props.id
            })
            })
            .then(response => response.json())
            .then(data => { 
                props.redirect(0)                
             })
    }
    return(
        <div style = {style.navChild} >
            <center>
            <form className="ui form" onSubmit={post} >
                    <div className = "field">
                    <input type="text" placeholder="Enter title" required                    
                    onChange = {(e) => 
                         updateFields({ title : e.target.value, content : fields.content }) }
                    value = {fields.title}
                    />
                    </div>
                    <div className = "field">
                    <input type="text" placeholder="Enter post" required
                    onChange = {(e) => 
                         updateFields({ content : e.target.value, title : fields.title }) }
                    value = {fields.content}
                    />
                    </div> 
                    <button >POST</button> 
            </form>                                     
            </center>
        </div>
        )
}
export {Create}