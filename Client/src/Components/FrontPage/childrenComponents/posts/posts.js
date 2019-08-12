import React, { useEffect, useState } from 'react';
import style from '../style'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
function Posts(props){
    const [posts, updatePost] = useState({
        posts : []
    })

    useEffect(() => {
        fetch(`/posts/${props.id}`)
            .then(response => response.json())
            .then(data => { 
                console.log(data)
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
                   <Link to ={`/post/${v._id}`}>
                   {JSON.stringify(v)}                   
                   </Link>
               </div>   
               )}
        </div>
        )
}
export {Posts}