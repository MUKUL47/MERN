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
            userId : props.id,
            p : props.properties,
            username : props.username,
            isAnonymous : props.isAnonymous    
        }
        console.log(this.state)
    }

    likePost = async()=>{
        let msg = 
        await fetch('/likeDislike',{
            method: "PUT",
            headers: {
              "Content-Type": "application/json"
            },    
            body: JSON.stringify({
                userId : this.state.userId,                
                postId : this.state.postId,
                currentLikes : this.state.likes                               
            })
            }
        ),
        ms1 = await msg,
        ms2 = await ms1.json()
        console.log(ms2)
        if(ms2.Success){ 
            let likes = this.state.likes,
            id = this.state.userId,
            pos = likes.indexOf(id);
            if( pos > -1 ){
                likes.splice(pos,1)
            }else{
                likes.push(id)
            }                                
            this.setState({
                likes : likes               
            })
        }
    }

    commentPost = async()=>{
        let c = this.state.currentComment,
        msg = await fetch('/comment',{
            method: "PUT",
            headers: {
              "Content-Type": "application/json"
            },    
            body: JSON.stringify({               
                postId : this.state.postId,
                comment : c,
                user : this.state.username                               
            })
            }
        ),
        ms1 = await msg,
        ms2 = await ms1.json()
        if(ms2.Success){ 
            let m1 = await fetch(`/comments/${this.state.postId}`),
            m2 = await m1,
            comments = await m2.json() 
            this.setState({
                comments : comments.comments,
                currentComment : ""
            })   
        }
    }

    changeStatus = async(status)=>{
        console.log(status)        
        let msg = 
        await fetch('/changeStatus',{
            method: "PUT",
            headers: {
              "Content-Type": "application/json"
            },    
            body: JSON.stringify({         
                postId : this.state.postId,
                status : status                               
            })
            }
        ),
        ms1 = await msg,
        ms2 = await ms1.json()
        if(ms2.Success){                     
            this.setState({
                status : status               
            })
        }
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
                keywords : this.state.keywords                               
            })
            }
        ),
        ms1 = await msg,
        ms2 = await ms1.json()
        if(ms2.Success){
            let kWs = this.state.keywords 
            kWs.splice
            (this.state.keywords.indexOf
            (this.state.currentKeyword),1)                      
            this.setState({
                keywords : kWs,
                currentKeyword : ""               
            })
        }
    }

    changeKeyword(e){
        this.setState({
            currentKeyword : e.target.value            
        })
    }

    changeComment(e){
        this.setState({
            currentComment : e.target.value            
        })
    }

    addKeyword = async()=>{
        let msg = 
        await fetch('/addKeyword',{
            method: "PUT",
            headers: {
              "Content-Type": "application/json"
            },    
            body: JSON.stringify({
                keyword : this.state.currentKeyword,                
                postId : this.state.postId,
                keywords : this.state.keywords                              
            })
            }
        ),
        ms1 = await msg,
        ms2 = await ms1.json()
        if(ms2.Success){
            let kWs = this.state.keywords 
            kWs.push(this.state.currentKeyword)                      
            this.setState({
                keywords : kWs,
                currentKeyword : ""                
            })
        }
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
            userId = {this.state.userId}
            isAnonymous = {this.state.isAnonymous}

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
