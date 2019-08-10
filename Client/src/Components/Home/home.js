import React, { Component } from 'react';
import homeStyle from './homeStyle'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {VerifyAccount} from './hiddenComponent'


class LoginRegister extends Component {
    
    constructor(props){
        super()
        let lE = ""
        if( props.location.state) lE = props.location.state.msg 
        this.state = {
            message : "WELCOME",
            login : {
                lPassword : "",
                lEmail : "",
                LoginErr : lE,
                rememberLogin : false,
            },
            register : {
                password : "",
                email : "",
                cPassword : "",
                registerErr : "",
                rememberRegisterLogin : false,
                
            },    
            verifyEmailBlock : 0,
            timeStamp : -1
        }
    }
    componentWillMount(){
        fetch("/getLastLogged")
        .then(msg => msg.json())
        .then(m => {
            if( m ){
                let user = JSON.parse(m.user)
                if( Math.abs(Math.floor(user.till - Date.now())/1000) < 3600 || user.till == Infinity ){
                    this.setState({
                        login : { 
                            LoginErr : this.state.login.LoginErr,
                            lEmail : user.user, 
                            rememberLogin : true,
                            lPassword : this.state.login.lPassword
                         }
                    })                    
                    this.autoLogin() 
                } 
            }
        })                
    }

    autoLogin(){
        fetch("/Login", {
            method: "POST",  
            headers: {
              "Content-Type": "application/json"
            },   
            body: JSON.stringify({
                email : this.state.login.lEmail || this.state.register.email,
                password : this.state.login.lPassword || this.state.register.password,
                rememberLogin : this.state.login.rememberLogin || this.state.register.rememberRegisterLogin
            })
            })
            .then(response => response.json())
            .then(data => {
                    if(data.Error){
                        this.setState({
                            login : { 
                                LoginErr : data.Error,
                                lEmail :this.state.login.lEmail, 
                                rememberLogin : this.state.login.rememberLogin,
                                lPassword : this.state.login.lPassword
                             }
                        })                 
                    }else{
                        this.props.history.push({
                        pathname:"/Home",
                        state:{
                            message: JSON.stringify(data.Success)
                         }
                       }) 
            }
             })
    }

    Login = (e)=>{                      
        e.preventDefault()  
        this.autoLogin()
    }

    Register = (e)=>{                      
        e.preventDefault()
            if(this.state.register.password === this.state.register.cPassword){
                fetch("/register", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json"
                    },    
                    body: JSON.stringify({
                        email : this.state.register.email,
                        password : this.state.register.password,
                        rememberLogin : this.state.register.rememberRegisterLogin
                    })
                    })
                    .then(response => response.json())
                    .then(data => {
                        console.log(data.code)
                            if( data.Error ){
                                this.setState({
                                    register : { 
                                        registerErr : data.Error,
                                        password : this.state.register.password,
                                        email : this.state.register.email,
                                        cPassword : this.state.register.cPassword,
                                        rememberRegisterLogin : this.state.register.rememberRegisterLogin,                                    
                                    }
                                })
                            }else{
                                
                                    this.setState({
                                        register : {registerErr : data.Success,                                        
                                            password : this.state.register.password,
                                            email : this.state.register.email,
                                            cPassword : this.state.register.cPassword,
                                            rememberRegisterLogin : this.state.register.rememberRegisterLogin,
                                        },
                                            verifyEmailBlock : data.code,
                                            timeStamp : data.timeStamp
                                        })                           
                                     
                            }
                     })
            }else{
                this.setState({
                    register : { registerErr : "Password mismatch"},
                    verifyEmailBlock : false
                })
            }        
    }

    updateStatus(){ 
        fetch("/updateStatus", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json"
            },    
            body: JSON.stringify({
                email : this.state.register.email,                
                remember : this.state.register.rememberRegisterLogin
            })
            })
            .then(response => response.json())
            .then(data => {  
                this.setState({ register : { 
                    registerErr : data.Success ,                    
                    password : this.state.register.password,
                    email : this.state.register.email,
                    cPassword : this.state.register.cPassword,
                    rememberRegisterLogin : this.state.register.rememberRegisterLogin,
                 },
                 verifyEmailBlock : false })                                            
                    this.autoLogin()                                       
             })
    }
    
    verifyCode = (e)=>{
        if(e.target.value == this.state.verifyEmailBlock){
            if( Math.floor(Date.now() - this.state.timeStamp)/1000 <= 300 ){
                this.updateStatus()                
            }else{
                this.setState({ register : { 
                    registerErr : "Code expired",                    
                    password : this.state.register.password,
                    email : this.state.register.email,
                    cPassword : this.state.register.cPassword,
                    rememberRegisterLogin : this.state.register.rememberRegisterLogin,
                 },
                 verifyEmailBlock : false })
            }
        }else{
            this.setState({ register : 
                {   registerErr : "Incorrect code",                
                    password : this.state.register.password,
                    email : this.state.register.email,
                    cPassword : this.state.register.cPassword,
                    rememberRegisterLogin : this.state.register.rememberRegisterLogin,
            } })
        }
    }
    render(){
        let v;
        if(this.state.verifyEmailBlock > 0){
            v = <div><VerifyAccount
            textChange = {this.verifyCode}
            /></div>
        }

        return(
            <div>
            <div style = {homeStyle.Register}>
                    <form className="ui form" onSubmit={this.Register}>
                    <div className = "field">
                    <input type="email" name="email"placeholder="Enter email" value = {this.state.register.email}
                    onChange = {(e) => 
                    { this.setState({ register : { email : e.target.value,                    
                        password : this.state.register.password,
                        cPassword : this.state.register.cPassword,
                        registerErr : this.state.register.registerErr,
                        rememberRegisterLogin : this.state.register.rememberRegisterLogin } }) }} required />
                    </div>
                    <div className = "field">
                    <input type="password" name="password" placeholder="Enter password" value = {this.state.register.password}
                    onChange = {(e) => 
                    { this.setState({ register : { password : e.target.value, 
                        email : this.state.register.email,
                        cPassword : this.state.register.cPassword,
                        registerErr : this.state.register.registerErr,
                        rememberRegisterLogin : this.state.register.rememberRegisterLogin, } }) }} required/>
                    </div>  
                    <div className = "field">
                    <input type="password" name="confirmPassword" placeholder="Confirm password" value = {this.state.register.cPassword}
                    onChange = {(e) => 
                    { this.setState({ register : { cPassword : e.target.value,                    
                        password : this.state.register.password,
                        email : this.state.register.email,
                        registerErr : this.state.register.registerErr,
                        rememberRegisterLogin : this.state.register.rememberRegisterLogin, }}) }} required/>
                    </div>
                    <br/> <br/><br/> 
                    <center>
                    <button className="ui inverted button" style = {homeStyle.btn} type="submit">REGISTER/ UPDATE STATUS</button>
                    <h2 style={homeStyle.err}>{this.state.register.registerErr}</h2>
                    </center>
                </form> {v}   
                </div>
                
                <div className="ui vertical divider" style = {homeStyle.verticalDivider}>OR</div>
                <div style = {homeStyle.Login}>
                    <form className="ui form" onSubmit={this.Login}>
                    <div className = "field">
                    <input type="email" name="email"placeholder="Enter email" value = {this.state.login.lEmail}
                    onChange = {(e) => { 
                        this.setState({ login : { 
                            lEmail : e.target.value, 
                            rememberLogin : this.state.login.rememberLogin,
                            lPassword : this.state.login.lPassword,
                            LoginErr : this.state.login.LoginErr 
                        } }) 
                    }}
                    />
                    </div>
                    <div className = "field">
                    <input type="password" name="password" placeholder="Enter password" value = {this.state.login.lPassword}
                    onChange = {(e) => { 
                        this.setState({ login : 
                            {   lPassword : e.target.value,
                                lEmail :this.state.login.lEmail, 
                                rememberLogin : this.state.login.rememberLogin,
                                LoginErr : this.state.login.LoginErr 
                            }}) 
                        }}/>
                    </div>
                    <div className="ui checkbox">                        
                    <input type="checkbox"defaultChecked = {this.state.login.rememberLogin}
                    onChange = { (e) => { 
                        this.setState({ login : 
                            {   rememberLogin : !this.state.login.rememberLogin,
                                lEmail :this.state.login.lEmail, 
                                lPassword : this.state.login.lPassword,
                                LoginErr : this.state.login.LoginErr
                             } }) 
                        } }/>
                    <label style={homeStyle.err}>Remember me</label>
                    </div><br/><br/>
                    <input type = "button" className="ui primary button" value = "LOGIN FROM GMAIL" onClick = {this.gmail}/><br/><br/>
                    <center>
                    <div style={homeStyle.fNR}><button className="ui inverted button" type="submit" style = {homeStyle.btn}>LOGIN</button></div>
                    <h2 style={homeStyle.err}>{this.state.login.LoginErr}</h2>                    
                    </center>   
                    </form>
                </div>
                                        
                </div>
        )
    }
}

export {LoginRegister}