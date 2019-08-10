import React, { useEffect, useState } from 'react';
import style from './style'
function Posts(props){
    const [posts, updatePost] = useState({
        posts : []
    })

    useEffect(() => {
        fetch(`/posts/${props.id}`)
            .then(response => response.json())
            .then(data => { 
                let newPosts = data.Success
                updatePost({
                    posts : newPosts
                })                
             })
    });

    return(
        <div style = {style.navChild}>
            {posts.posts.map((v,i) => 
               <div className="item" key = {Math.random()}>
                   <h1>{v.title}</h1>
               </div>   
               )}
        </div>
        )
}
export {Posts}