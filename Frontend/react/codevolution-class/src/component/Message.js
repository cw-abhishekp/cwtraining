import React, { Component } from "react";
class Message extends Component{
    constructor(){
        super();
        this.state ={
            message : "Welcome visitor"
        }
    }

    changeState() {
        this.setState({
            message : "Thankyou for coming!"
        })
    }
    render(){
        return (
            <>
            <h1>{this.state.message}</h1>
            <hr></hr>
             </>
        );
    }
}

export default Message;