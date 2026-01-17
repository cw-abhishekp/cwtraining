import React, { Component } from "react";

class Welcome extends Component{
    render(){
        return (
            <>
            <h1>This is the class Component</h1>
            <p>{this.props.name} favourite cricketer is {this.props.cricketerName}</p>
            {this.props.children}
            </>
        );
    }
}

export default Welcome;