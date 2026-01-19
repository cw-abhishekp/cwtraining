import React, { Component } from "react";

import InputRefs from "./InputRefs";

class InputParentRefs extends Component{
    constructor(props){
        super(props)
        this.componentRef = React.createRef()
        this.clickHandler = this.clickHandler.bind(this)
    }


    // hre we are pssing the reference and calling the child or other class by passing references
    clickHandler(){
        this.componentRef.current.focusInput()
    }


    render(){
        return (
            <>
            <InputRefs ref = {this.componentRef}/>
            <button onClick={this.clickHandler}>Click</button>
            </>
        )
    }
}

export default InputParentRefs    