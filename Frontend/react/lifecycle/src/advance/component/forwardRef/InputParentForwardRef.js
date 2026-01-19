import React, { Component } from "react";

import FRInput from "./InputForwardRef";

class InputParentForwardRef extends Component{
    constructor(props){
        super(props)
        this.componentRef = React.createRef()
        this.clickHandler = this.clickHandler.bind(this)
    }


    // hre we are pssing the reference and calling the child or other class by passing references
    clickHandler(){
        this.componentRef.current.focus()
    }


    render(){
        return (
            <>
            <FRInput ref = {this.componentRef}/>
            <button onClick={this.clickHandler}>Click</button>
            </>
        )
    }
}

export default InputParentForwardRef    