import React, { Component } from 'react';
import {Post} from './components'
class ComponentController extends Component{
    constructor(props){
        super(props) 
        let post = JSON.parse(props.post)     
        this.state = {
            postId : post._id,
            title : post.title,
            content : post.content,
            keywords : post.keywords,
            at : post.at,
            status : post.status,
            likes : post.likes,
            comments : post.comments,            
            currentKeyword : "",
            currentComment : "",
            userId : props.id
        }
    }

    likePost(){
        console.log('liked')
    }

    commentPost(){
        console.log(this.state.currentComment)
    }

    changeStatus(status){
        console.log(status)
    }

    removeKeyword = async (k)=>{
        let msg = 
        await fetch('/deleteKeyword',{
            method: "DELETE",
            headers: {
              "Content-Type": "application/json"
            },    
            body: JSON.stringify({
                keyword : k,                
                postId : this.state.postId,
                userId : this.state.userId,
                keywords : this.state.keywords                                
            })
            }
        ),
        ms1 = await msg,
        ms2 = await ms1.json()
        console.log(ms2)
    }

    changeKeyword(e){
        this.setState({
            currentKeyword : e.target.value            
        })
    }

    changeComment(e){
        console.log(e)
        this.setState({
            currentComment : e.target.value            
        })
    }

    addKeyword(){
        console.log(this.state.currentKeyword)
    }

    deletePost(){
        console.log('deleted')
    }

    deleteComment(){
        
    }

    render(){
        return(
            <Post
            keywords = {this.state.keywords}
            title = {this.state.title}
            content = {this.state.content}
            likes = {this.state.likes}
            status = {this.state.status}
            at = {this.state.at}
            comments = {this.state.comments}

            currentKeyword = {this.state.currentKeyword}
            changeKeyword = {this.changeKeyword.bind(this)}
            addKeyword = {this.addKeyword.bind(this)}
            removeKeyword = {this.removeKeyword.bind(this)}

            currentComment = {this.state.currentComment}
            changeComment = {this.changeComment.bind(this)}
            commentPost = {this.commentPost.bind(this)}           

            changeStatus = {this.changeStatus.bind(this)}

            likePost = {this.likePost.bind(this)}

            deletePost = {this.deletePost.bind(this)}
            />
        )
    }
}

export {ComponentController}
