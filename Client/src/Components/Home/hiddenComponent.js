import React, { Component } from 'react';
import homeStyle from './homeStyle'

function VerifyAccount(props){
        return(
        <center>
            <div style={homeStyle.verifyAccount}>
            <form><br/><br/><br/>
            <div className="ui form">
                <div className="fields">
                    <input type="number" placeholder="Enter code" onChange = {props.textChange}/>                
                </div>
            </div>
            </form>            
        </div>
        </center>
        )
}

class ResetPassword{

}

export {VerifyAccount, ResetPassword} 